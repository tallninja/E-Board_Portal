/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/15/24 : 11:08 AM
 */
package com.bobgroganconsulting.eboardportal.service;

import com.bobgroganconsulting.eboardportal.dtos.query.VideoRecordingDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface VideoRecordingService {

    Page<VideoRecordingDto> findAll(Pageable pageable);
    Page<VideoRecordingDto> findAll(UUID meetingId, Pageable pageable);
    long getCount();
    long getCount(UUID meetingId);
    long getCount(String slug);
    long getStorageUsed();
    long getStorageUsed(UUID meetingId);
    long getStorageUsed(String slug);
    VideoRecordingDto findById(UUID id);
    VideoRecordingDto upload(UUID meetingId, MultipartFile multipartFile) throws Exception;
    void delete(UUID id);

}
