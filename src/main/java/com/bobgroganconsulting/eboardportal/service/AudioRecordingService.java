/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/15/24 : 11:08 AM
 */
package com.bobgroganconsulting.eboardportal.service;

import com.bobgroganconsulting.eboardportal.dtos.mutation.CreateAudioRecordingDto;
import com.bobgroganconsulting.eboardportal.dtos.query.AudioRecordingDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface AudioRecordingService {

    Page<AudioRecordingDto> findAll(Pageable pageable);
    Page<AudioRecordingDto> findAll(UUID meetingId, Pageable pageable);
    long getCount();
    long getCount(UUID meetingId);
    AudioRecordingDto findById(UUID id);
    AudioRecordingDto upload(UUID meetingId, MultipartFile multipartFile) throws Exception;
    void delete(UUID id);

}
