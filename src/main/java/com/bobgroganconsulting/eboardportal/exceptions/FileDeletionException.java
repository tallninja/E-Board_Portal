/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 4/9/24 : 6:32 PM
 */
package com.bobgroganconsulting.eboardportal.exceptions;

public class FileDeletionException extends InternalServerErrorException {
    public FileDeletionException(String fileName) {
        super("Failed to delete file" + fileName);
    }
}
