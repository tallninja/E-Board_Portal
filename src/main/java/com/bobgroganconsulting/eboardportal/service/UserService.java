/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/14/24 : 8:54 PM
 */
package com.bobgroganconsulting.eboardportal.service;

import com.bobgroganconsulting.eboardportal.domain.entities.User;
import com.bobgroganconsulting.eboardportal.dtos.mutation.CreateUserDto;
import com.bobgroganconsulting.eboardportal.dtos.query.UserDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface UserService {

    UserDto findById(UUID id);
    UserDto findByEmail(String email);
    Page<UserDto> findAll(Pageable pageable);
    UserDto create(CreateUserDto userDto);
    void delete(UUID id);
    User findOne(String email);
    User findOne(UUID id);

}
