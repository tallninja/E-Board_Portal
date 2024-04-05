/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/27/24 : 11:05 AM
 */
package com.bobgroganconsulting.eboardportal.service.impl;

import com.bobgroganconsulting.eboardportal.constants.AudioFileTypes;
import com.bobgroganconsulting.eboardportal.domain.entities.AudioRecording;
import com.bobgroganconsulting.eboardportal.domain.entities.Meeting;
import com.bobgroganconsulting.eboardportal.dtos.BlobFile;
import com.bobgroganconsulting.eboardportal.dtos.query.AudioRecordingDto;
import com.bobgroganconsulting.eboardportal.exceptions.AudioRecordingNotFoundException;
import com.bobgroganconsulting.eboardportal.mapping.AudioRecordingMapper;
import com.bobgroganconsulting.eboardportal.repository.AudioRecordingRepository;
import com.bobgroganconsulting.eboardportal.service.AudioRecordingService;
import com.bobgroganconsulting.eboardportal.service.FileTransferService;
import com.bobgroganconsulting.eboardportal.service.MeetingService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import static com.bobgroganconsulting.eboardportal.service.utils.FileTransferUtils.*;

import java.util.UUID;

@Service
public class AudioRecordingServiceImpl implements AudioRecordingService {

    private final AudioRecordingRepository audioRecordingRepository;
    private final AudioRecordingMapper audioRecordingMapper;
    private final MeetingService meetingService;
    private final FileTransferService fileTransferService;

    public AudioRecordingServiceImpl(AudioRecordingRepository audioRecordingRepository, AudioRecordingMapper audioRecordingMapper, MeetingService meetingService, FileTransferService fileTransferService) {
        this.audioRecordingRepository = audioRecordingRepository;
        this.audioRecordingMapper = audioRecordingMapper;
        this.meetingService = meetingService;
        this.fileTransferService = fileTransferService;
    }

    @Override
    public Page<AudioRecordingDto> findAll(Pageable pageable) {
        Page<AudioRecording> audioRecordings = audioRecordingRepository.findAll(pageable);
        return audioRecordings.map(audioRecordingMapper::toAudioRecordingDto);
    }

    @Override
    public Page<AudioRecordingDto> findAll(UUID meetingId, Pageable pageable) {
        Meeting meeting = meetingService.findOne(meetingId);
        Page<AudioRecording> audioRecordings = audioRecordingRepository.findByMeeting(meeting, pageable);
        return audioRecordings.map(audioRecordingMapper::toAudioRecordingDto);
    }

    @Override
    public long getCount() {
        return audioRecordingRepository.count();
    }

    @Override
    public AudioRecordingDto findById(UUID id) {
        AudioRecording audioRecording = findOne(id);
        return audioRecordingMapper.toAudioRecordingDto(audioRecording);
    }

    @Override
    public AudioRecordingDto upload(UUID meetingId, MultipartFile multipartFile) throws Exception {
        Meeting meeting = meetingService.findOne(meetingId);
        assertFileTypeIsValid(multipartFile, AudioFileTypes.ALLOWED_FILE_TYPES);
        BlobFile blobFile = fileTransferService.uploadFile(multipartFile);
        AudioRecording audioRecording = audioRecordingMapper.toAudioRecording(blobFile);
        audioRecording.setMeeting(meeting);
        audioRecordingRepository.save(audioRecording);
        return audioRecordingMapper.toAudioRecordingDto(audioRecording);
    }

    @Override
    public void delete(UUID id) {
        AudioRecording audioRecording = findOne(id);
        audioRecordingRepository.delete(audioRecording);
    }

    private AudioRecording findOne(UUID id) {
        return audioRecordingRepository
                .findById(id)
                .orElseThrow(() -> new AudioRecordingNotFoundException(id));
    }

}
