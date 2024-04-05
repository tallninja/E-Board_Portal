/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/15/24 : 9:35 AM
 */
package com.bobgroganconsulting.eboardportal.exceptions;

public class RefreshTokenExpiredException extends ForbiddenException {

    public RefreshTokenExpiredException() {
        super("Refresh token expired, please login again.");
    }
}
