/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/14/24 : 10:07 PM
 */
package com.bobgroganconsulting.eboardportal.web.restcontrollers;

import com.bobgroganconsulting.eboardportal.dtos.mutation.CreateUserDto;
import com.bobgroganconsulting.eboardportal.dtos.mutation.LoginRequest;
import com.bobgroganconsulting.eboardportal.dtos.query.LoginResponse;
import com.bobgroganconsulting.eboardportal.dtos.query.TokensDto;
import com.bobgroganconsulting.eboardportal.dtos.query.UserDto;
import com.bobgroganconsulting.eboardportal.service.AuthService;
import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping(value = "api/auth", name = "auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping(value = "register")
    ResponseEntity<UserDto> register(@RequestBody CreateUserDto userDto) {
        UserDto registeredUser = authService.registerUser(userDto);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    @PostMapping(value = "login")
    ResponseEntity<LoginResponse> loginUser(
            @RequestBody LoginRequest loginRequest,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        LoginResponse loginResponse = authService.loginUser(loginRequest, request, response);
        return new ResponseEntity<>(loginResponse, HttpStatus.OK);
    }

    @GetMapping(value = "profile")
    ResponseEntity<UserDto> profile() {
        UserDto authenticatedUser = authService.getAuthenticatedUser();
        return new ResponseEntity<>(authenticatedUser, HttpStatus.OK);
    }

    @GetMapping("refresh-token")
    private ResponseEntity<TokensDto> refreshToken(@RequestParam(name = "token") UUID refreshToken) throws Exception {
        return ResponseEntity.ok().body(authService.refreshAccessToken(refreshToken));
    }

    @PostMapping("logout")
    private ResponseEntity<?> logout(HttpServletRequest request) {
        authService.logoutUser();
        return ResponseEntity.noContent().build();
    }

}
