/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 4/7/24 : 10:03 AM
 */
package com.bobgroganconsulting.eboardportal.exceptions;

public class MeetingAlreadyExistsException extends BadRequestException {
    public MeetingAlreadyExistsException(String title) {
        super("Meeting " + title + " already exists.");
    }
}
