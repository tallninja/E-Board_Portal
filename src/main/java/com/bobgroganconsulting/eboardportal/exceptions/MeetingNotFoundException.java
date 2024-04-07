/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/27/24 : 1:02 PM
 */
package com.bobgroganconsulting.eboardportal.exceptions;

import java.util.UUID;

public class MeetingNotFoundException extends NotFoundException {
    public MeetingNotFoundException(UUID id) {
        super("Meeting with id " + id + " does not exist.");
    }
    public MeetingNotFoundException(String slug) {
        super("Meeting with slug " + slug + " does not exist.");
    }
}
