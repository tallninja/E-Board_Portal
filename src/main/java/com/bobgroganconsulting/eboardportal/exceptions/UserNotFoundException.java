/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/14/24 : 9:00 PM
 */
package com.bobgroganconsulting.eboardportal.exceptions;

import java.util.UUID;

public class UserNotFoundException extends NotFoundException {
    public UserNotFoundException(UUID id) {
        super("User with id " + id + " was not found.");
    }
    public UserNotFoundException(String email) {
        super("User with email " + email + " was not found.");
    }
}
