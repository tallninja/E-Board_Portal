/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/27/24 : 1:19 PM
 */
package com.bobgroganconsulting.eboardportal.exceptions;

import java.util.UUID;

public class VideoRecordingNotFoundException extends NotFoundException {
    public VideoRecordingNotFoundException(UUID id) {
        super("Video recording with id " + id + " does not exist.");
    }
}
