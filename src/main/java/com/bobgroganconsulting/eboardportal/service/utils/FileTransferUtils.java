/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/27/24 : 12:14 PM
 */
package com.bobgroganconsulting.eboardportal.service.utils;

import com.bobgroganconsulting.eboardportal.constants.FileTypes;
import com.bobgroganconsulting.eboardportal.exceptions.FileSizeException;
import com.bobgroganconsulting.eboardportal.exceptions.FileTypeException;
import com.bobgroganconsulting.eboardportal.exceptions.FileUploadExeption;
import org.apache.commons.io.FilenameUtils;
import org.springframework.util.Assert;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Date;
import java.util.Objects;

public class FileTransferUtils {

    public static void assertFileIsValid(MultipartFile multipartFile) {
        assertFileIsNotEmpty(multipartFile);
        assertFileNameIsValid(multipartFile);
        assertFileTypeIsValid(multipartFile);
    }

    public static void assertFileIsNotEmpty(MultipartFile multipartFile) {
        if (multipartFile.isEmpty()) {
            throw new FileSizeException("File appears to be empty.");
        }
    }

    public static void assertFileNameIsValid(MultipartFile multipartFile) {
        String fileName = multipartFile.getOriginalFilename();
        if (Objects.isNull(fileName) || fileName.trim().isEmpty()) {
            throw new FileUploadExeption("Invalid file name.");
        }
    }

    public static void assertFileTypeIsValid(MultipartFile multipartFile) {
        String fileExtension = FilenameUtils.getExtension(multipartFile.getOriginalFilename());
        if (!FileTypes.ALLOWED_FILE_TYPES.contains(fileExtension)) {
            throw new FileTypeException(fileExtension);
        }
    }

    public static String generateFileName(MultipartFile multipartFile) {
        Assert.notNull(multipartFile.getOriginalFilename(), "");
        return new Date().getTime() + "-" + multipartFile
                .getOriginalFilename()
                .replace(" ", "_");
    }

    public static String getFileExtension(MultipartFile multipartFile) {
        return FilenameUtils.getExtension(multipartFile.getOriginalFilename());
    }

    public static File convertMultipartFileToFile(MultipartFile multipartFile) throws Exception {
        Assert.notNull(multipartFile.getOriginalFilename(), "");
        File file = new File(multipartFile.getOriginalFilename());
        try (FileOutputStream fileOutputStream = new FileOutputStream(file)) {
            fileOutputStream.write(multipartFile.getBytes());
        }
        return file;
    }

}
