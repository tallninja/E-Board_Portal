/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/14/24 : 9:09 PM
 */
package com.bobgroganconsulting.eboardportal.exceptions;

public class UserWithEmailExistsException extends BadRequestException {
    public UserWithEmailExistsException(String email) {
        super("User with email " + email + " already exists.");
    }
}
