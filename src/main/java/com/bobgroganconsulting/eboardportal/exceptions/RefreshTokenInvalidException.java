/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/29/24 : 3:45 PM
 */
package com.bobgroganconsulting.eboardportal.exceptions;

public class RefreshTokenInvalidException extends ForbiddenException {
    public RefreshTokenInvalidException() {
        super("User not authenticated, please login.");
    }
}
