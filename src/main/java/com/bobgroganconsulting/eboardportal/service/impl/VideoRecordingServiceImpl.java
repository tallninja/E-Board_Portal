/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/27/24 : 11:05 AM
 */
package com.bobgroganconsulting.eboardportal.service.impl;

import com.bobgroganconsulting.eboardportal.constants.VideoFileTypes;
import com.bobgroganconsulting.eboardportal.domain.entities.VideoRecording;
import com.bobgroganconsulting.eboardportal.domain.entities.Meeting;
import com.bobgroganconsulting.eboardportal.dtos.BlobFile;
import com.bobgroganconsulting.eboardportal.dtos.query.VideoRecordingDto;
import com.bobgroganconsulting.eboardportal.exceptions.VideoRecordingNotFoundException;
import com.bobgroganconsulting.eboardportal.mapping.VideoRecordingMapper;
import com.bobgroganconsulting.eboardportal.repository.VideoRecordingRepository;
import com.bobgroganconsulting.eboardportal.service.VideoRecordingService;
import com.bobgroganconsulting.eboardportal.service.FileTransferService;
import com.bobgroganconsulting.eboardportal.service.MeetingService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import static com.bobgroganconsulting.eboardportal.service.utils.FileTransferUtils.*;

import java.util.UUID;

@Service
public class VideoRecordingServiceImpl implements VideoRecordingService {

    private final VideoRecordingRepository videoRecordingRepository;
    private final VideoRecordingMapper videoRecordingMapper;
    private final MeetingService meetingService;
    private final FileTransferService fileTransferService;

    public VideoRecordingServiceImpl(VideoRecordingRepository videoRecordingRepository, VideoRecordingMapper videoRecordingMapper, MeetingService meetingService, FileTransferService fileTransferService) {
        this.videoRecordingRepository = videoRecordingRepository;
        this.videoRecordingMapper = videoRecordingMapper;
        this.meetingService = meetingService;
        this.fileTransferService = fileTransferService;
    }

    @Override
    public Page<VideoRecordingDto> findAll(Pageable pageable) {
        Page<VideoRecording> videoRecordings = videoRecordingRepository.findAll(pageable);
        return videoRecordings.map(videoRecordingMapper::toVideoRecordingDto);
    }

    @Override
    public Page<VideoRecordingDto> findAll(UUID meetingId, Pageable pageable) {
        Meeting meeting = meetingService.findOne(meetingId);
        Page<VideoRecording> videoRecordings = videoRecordingRepository.findByMeeting(meeting, pageable);
        return videoRecordings.map(videoRecordingMapper::toVideoRecordingDto);
    }

    @Override
    public long getCount() {
        return videoRecordingRepository.count();
    }

    @Override
    public long getCount(UUID meetingId) {
        Meeting meeting = meetingService.findOne(meetingId);
        return videoRecordingRepository.count(meeting);
    }

    @Override
    public long getStorageUsed() {
        return videoRecordingRepository.storageUsed();
    }

    @Override
    public long getStorageUsed(UUID meetingId) {
        Meeting meeting = meetingService.findOne(meetingId);
        return videoRecordingRepository.storageUsed(meeting);
    }

    @Override
    public VideoRecordingDto findById(UUID id) {
        VideoRecording videoRecording = findOne(id);
        return videoRecordingMapper.toVideoRecordingDto(videoRecording);
    }

    @Override
    public VideoRecordingDto upload(UUID meetingId, MultipartFile multipartFile) throws Exception {
        Meeting meeting = meetingService.findOne(meetingId);
        assertFileTypeIsValid(multipartFile, VideoFileTypes.ALLOWED_FILE_TYPES);
        BlobFile blobFile = fileTransferService.uploadFile(multipartFile);
        VideoRecording videoRecording = videoRecordingMapper.toVideoRecording(blobFile);
        videoRecording.setMeeting(meeting);
        videoRecordingRepository.save(videoRecording);
        return videoRecordingMapper.toVideoRecordingDto(videoRecording);
    }

    @Override
    public void delete(UUID id) {
        VideoRecording videoRecording = findOne(id);
        videoRecordingRepository.delete(videoRecording);
    }

    private VideoRecording findOne(UUID id) {
        return videoRecordingRepository
                .findById(id)
                .orElseThrow(() -> new VideoRecordingNotFoundException(id));
    }

}
