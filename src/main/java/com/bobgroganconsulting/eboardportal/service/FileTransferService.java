/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/12/24 : 4:43 PM
 */
package com.bobgroganconsulting.eboardportal.service;

import com.bobgroganconsulting.eboardportal.dtos.BlobFile;
import org.springframework.web.multipart.MultipartFile;

public interface FileTransferService {
    BlobFile uploadFile(MultipartFile multipartFile) throws Exception;
    Object downloadFile(String fileName) throws Exception;
    boolean delete(String fileName);
}
