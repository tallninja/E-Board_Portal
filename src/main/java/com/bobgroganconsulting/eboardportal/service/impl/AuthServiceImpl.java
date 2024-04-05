/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/14/24 : 8:53 PM
 */
package com.bobgroganconsulting.eboardportal.service.impl;

import com.bobgroganconsulting.eboardportal.domain.entities.RefreshToken;
import com.bobgroganconsulting.eboardportal.domain.entities.User;
import com.bobgroganconsulting.eboardportal.dtos.mutation.CreateUserDto;
import com.bobgroganconsulting.eboardportal.dtos.mutation.LoginRequest;
import com.bobgroganconsulting.eboardportal.dtos.query.LoginResponse;
import com.bobgroganconsulting.eboardportal.dtos.query.TokensDto;
import com.bobgroganconsulting.eboardportal.dtos.query.UserDto;
import com.bobgroganconsulting.eboardportal.exceptions.ForbiddenException;
import com.bobgroganconsulting.eboardportal.exceptions.RefreshTokenExpiredException;
import com.bobgroganconsulting.eboardportal.exceptions.RefreshTokenInvalidException;
import com.bobgroganconsulting.eboardportal.mapping.UserMapper;
import com.bobgroganconsulting.eboardportal.repository.RefreshTokenRepository;
import com.bobgroganconsulting.eboardportal.service.AuthService;
import com.bobgroganconsulting.eboardportal.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.convert.DurationStyle;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AuthServiceImpl implements AuthService {

    @Value("${app.config.security.jwt.access-token-expires}")
    private String accessTokenExpires;

    @Value("${app.config.security.jwt.refresh-token-expires}")
    private String refreshTokenExpires;
    private final UserService userService;
    private final UserMapper userMapper;
    private final JwtEncoder jwtEncoder;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenRepository refreshTokenRepository;

    public AuthServiceImpl(UserService userService, AuthenticationManager authenticationManager, UserMapper userMapper, JwtEncoder jwtEncoder, RefreshTokenRepository refreshTokenRepository) {
        this.userService = userService;
        this.userMapper = userMapper;
        this.jwtEncoder = jwtEncoder;
        this.refreshTokenRepository = refreshTokenRepository;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public UserDto registerUser(CreateUserDto userDto) {
        return userService.create(userDto);
    }

    @Override
    public LoginResponse loginUser(LoginRequest credentials, HttpServletRequest request, HttpServletResponse response) {
        User user = userService.findOne(credentials.getEmail());
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(credentials.getEmail(), credentials.getPassword());
        Authentication auth = authenticationManager.authenticate(token);
        Jwt accessToken = generateAccessToken(auth);
        RefreshToken refreshToken = createRefreshToken(user);

        Assert.notNull(accessToken.getExpiresAt(), "");
        TokensDto tokens = TokensDto.builder()
                .accessToken(accessToken.getTokenValue())
                .refreshToken(refreshToken.getToken().toString())
                .expires(accessToken.getExpiresAt().getEpochSecond())
                .build();

        return LoginResponse.builder()
                .user(userMapper.toUserDto(user))
                .tokens(tokens)
                .build();
    }

    @Override
    public UserDto getAuthenticatedUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userService.findByEmail(email);
    }

    @Override
    public TokensDto refreshAccessToken(UUID refreshToken) {
        RefreshToken validToken = verifyRefreshToken(refreshToken);
        Jwt accessToken = generateAccessToken(validToken.getUser());

        Assert.notNull(accessToken.getExpiresAt(), "");
        return TokensDto.builder()
                .accessToken(accessToken.getTokenValue())
                .refreshToken(validToken.getToken().toString())
                .expires(accessToken.getExpiresAt().getEpochSecond())
                .build();
    }

    private Jwt generateAccessToken(User user) {
        return getAccessToken(user);
    }

    private Jwt generateAccessToken(Authentication authentication) {
        return getAccessToken(authentication);
    }

    private Jwt getAccessToken(User user) {
        Instant now = Instant.now();
        String scope = "ROLE_USER";
        long expires = DurationStyle.detectAndParse(accessTokenExpires).toMillis();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plusMillis(expires))
                .subject(user.getEmail())
                .claim("scope", scope)
                .build();
        JwtEncoderParameters encoderParameters = JwtEncoderParameters
                .from(JwsHeader.with(MacAlgorithm.HS512).build(), claims);
        return this.jwtEncoder.encode(encoderParameters);
    }

    private Jwt getAccessToken(Authentication authentication) {
        Instant now = Instant.now();
        String scope = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));
        long expires = DurationStyle.detectAndParse(accessTokenExpires).toMillis();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plusMillis(expires))
                .subject(authentication.getName())
                .claim("scope", scope)
                .build();
        JwtEncoderParameters encoderParameters = JwtEncoderParameters
                .from(JwsHeader.with(MacAlgorithm.HS512).build(), claims);
        return this.jwtEncoder.encode(encoderParameters);
    }

    private RefreshToken createRefreshToken(User user) {
        Optional<RefreshToken> refreshToken = refreshTokenRepository
                .findByUser(user);
        long expires = DurationStyle.detectAndParse(refreshTokenExpires).toMillis();
        return refreshToken.orElseGet(() -> refreshTokenRepository.save(
                RefreshToken.builder()
                        .token(UUID.randomUUID())
                        .user(user)
                        .expiresAt(Instant.now().plusMillis(expires).getEpochSecond())
                        .build()
        ));
    }

    public RefreshToken verifyRefreshToken(UUID refreshToken) {
        RefreshToken token = refreshTokenRepository.findById(refreshToken)
                .orElseThrow(() -> new RefreshTokenInvalidException());
        if (token.getExpiresAt() - Instant.now().getEpochSecond() < 0) {
            refreshTokenRepository.delete(token);
            throw new RefreshTokenExpiredException();
        }
        return token;
    }

}
