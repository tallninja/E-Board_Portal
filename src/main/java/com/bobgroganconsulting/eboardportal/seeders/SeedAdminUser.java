/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 4/7/24 : 10:08 AM
 */
package com.bobgroganconsulting.eboardportal.seeders;

import com.bobgroganconsulting.eboardportal.domain.entities.User;
import com.bobgroganconsulting.eboardportal.dtos.mutation.CreateUserDto;
import com.bobgroganconsulting.eboardportal.repository.UserRepository;
import com.bobgroganconsulting.eboardportal.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Slf4j
@Component
public class SeedAdminUser implements CommandLineRunner {

    private final UserService userService;
    private final UserRepository userRepository;

    public SeedAdminUser(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    public void createAdminUser() {
        CreateUserDto adminUser = CreateUserDto.builder()
                .firstName("Ernest")
                .lastName("Wambua")
                .email("ernestwambua2@gmail.com")
                .phoneNumber("+254719286396")
                .password("password")
                .build();
        Optional<User> existingUser = userRepository.findByEmail(adminUser.getEmail());

        if (existingUser.isEmpty()) {
            log.info("Creating admin user...");
            userService.create(adminUser);
            log.info("Created admin user...");
        }
    }

    @Override
    public void run(String... args) throws Exception {
        createAdminUser();
    }
}
