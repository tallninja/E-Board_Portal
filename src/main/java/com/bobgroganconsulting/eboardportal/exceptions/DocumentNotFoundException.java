/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/27/24 : 1:19 PM
 */
package com.bobgroganconsulting.eboardportal.exceptions;

import java.util.UUID;

public class DocumentNotFoundException extends NotFoundException {
    public DocumentNotFoundException(UUID id) {
        super("Audio recording with id " + id + " does not exist.");
    }
}
