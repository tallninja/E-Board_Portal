/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/14/24 : 9:11 PM
 */
package com.bobgroganconsulting.eboardportal.exceptions;

public class UserWithPhoneNumberExistsException extends BadRequestException {
    public UserWithPhoneNumberExistsException(String phoneNumber) {
        super("User with phone number " + phoneNumber + " already exists.");
    }
}
