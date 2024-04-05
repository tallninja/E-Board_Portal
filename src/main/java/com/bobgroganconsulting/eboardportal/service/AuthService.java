/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/14/24 : 8:23 PM
 */
package com.bobgroganconsulting.eboardportal.service;

import com.bobgroganconsulting.eboardportal.dtos.mutation.CreateUserDto;
import com.bobgroganconsulting.eboardportal.dtos.mutation.LoginRequest;
import com.bobgroganconsulting.eboardportal.dtos.query.LoginResponse;
import com.bobgroganconsulting.eboardportal.dtos.query.TokensDto;
import com.bobgroganconsulting.eboardportal.dtos.query.UserDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.UUID;

public interface AuthService {

    UserDto registerUser(CreateUserDto userDto);
    LoginResponse loginUser(LoginRequest credentials, HttpServletRequest request, HttpServletResponse response);
    void logoutUser();
    UserDto getAuthenticatedUser();
    TokensDto refreshAccessToken(UUID refreshToken);

}
