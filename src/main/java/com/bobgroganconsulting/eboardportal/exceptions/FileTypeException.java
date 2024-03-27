/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/12/24 : 4:35 PM
 */
package com.bobgroganconsulting.eboardportal.exceptions;

public class FileTypeException extends FileTransferException {
    public FileTypeException(String fileType) {
        super("Invalid file type " + fileType + ".");
    }
}
