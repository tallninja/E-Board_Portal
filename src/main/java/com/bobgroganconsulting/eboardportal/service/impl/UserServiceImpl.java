/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/14/24 : 8:56 PM
 */
package com.bobgroganconsulting.eboardportal.service.impl;

import com.bobgroganconsulting.eboardportal.domain.entities.User;
import com.bobgroganconsulting.eboardportal.dtos.mutation.CreateUserDto;
import com.bobgroganconsulting.eboardportal.dtos.query.UserDto;
import com.bobgroganconsulting.eboardportal.exceptions.UserNotFoundException;
import com.bobgroganconsulting.eboardportal.exceptions.UserWithEmailExistsException;
import com.bobgroganconsulting.eboardportal.exceptions.UserWithPhoneNumberExistsException;
import com.bobgroganconsulting.eboardportal.mapping.UserMapper;
import com.bobgroganconsulting.eboardportal.repository.UserRepository;
import com.bobgroganconsulting.eboardportal.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDto findById(UUID id) {
        User user = findOne(id);
        return userMapper.toUserDto(user);
    }

    @Override
    public UserDto findByEmail(String email) {
        User user = findOne(email);
        return userMapper.toUserDto(user);
    }

    @Override
    public Page<UserDto> findAll(Pageable pageable) {
        Page<User> users = userRepository.findAll(pageable);
        return users.map(userMapper::toUserDto);
    }

    @Override
    public UserDto create(CreateUserDto userDto) {
        Optional<User> userWithEmail = userRepository
                .findByEmail(userDto.getEmail());
        if (userWithEmail.isPresent()) {
            throw new UserWithEmailExistsException(userDto.getEmail());
        }

        Optional<User> userWithPhoneNumber = userRepository
                .findByPhoneNumber(userDto.getPhoneNumber());
        if (userWithPhoneNumber.isPresent()) {
            throw new UserWithPhoneNumberExistsException(userDto.getPhoneNumber());
        }

        User user = userMapper.toUser(userDto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        return userMapper.toUserDto(user);
    }

    @Override
    public void delete(UUID id) {
        User user = findOne(id);
        userRepository.delete(user);
    }

    @Override
    public User findOne(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @Override
    public User findOne(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(email));
    }

}
