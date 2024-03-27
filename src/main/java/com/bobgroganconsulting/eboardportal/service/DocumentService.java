/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/15/24 : 11:07 AM
 */
package com.bobgroganconsulting.eboardportal.service;

import com.bobgroganconsulting.eboardportal.dtos.query.DocumentDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface DocumentService {

    Page<DocumentDto> findAll(Pageable pageable);
    Page<DocumentDto> findAll(UUID meetingId, Pageable pageable);
    DocumentDto findById(UUID id);
    DocumentDto upload(UUID id, MultipartFile multipartFile) throws Exception;
    void delete(UUID id);

}
