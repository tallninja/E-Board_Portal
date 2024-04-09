/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 4/9/24 : 11:19 AM
 */
package com.bobgroganconsulting.eboardportal.service.impl;

import com.bobgroganconsulting.eboardportal.dtos.query.CountsDto;
import com.bobgroganconsulting.eboardportal.service.*;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class StatsServiceImpl implements StatsService {

    private final MeetingService meetingService;
    private final DocumentService documentService;
    private final AudioRecordingService audioRecordingService;
    private final VideoRecordingService videoRecordingService;

    public StatsServiceImpl(MeetingService meetingService, DocumentService documentService, AudioRecordingService audioRecordingService, VideoRecordingService videoRecordingService) {
        this.meetingService = meetingService;
        this.documentService = documentService;
        this.audioRecordingService = audioRecordingService;
        this.videoRecordingService = videoRecordingService;
    }

    @Override
    public CountsDto getCounts() {
        return CountsDto.builder()
                .meetings(meetingService.getCount())
                .documents(documentService.getCount())
                .audioRecordings(audioRecordingService.getCount())
                .videoRecordings(videoRecordingService.getCount())
                .build();
    }

    @Override
    public CountsDto getCounts(UUID meetingId) {
        return CountsDto.builder()
                .documents(documentService.getCount(meetingId))
                .audioRecordings(audioRecordingService.getCount(meetingId))
                .videoRecordings(videoRecordingService.getCount(meetingId))
                .build();
    }

    @Override
    public CountsDto getCounts(String slug) {
        return CountsDto.builder()
                .documents(documentService.getCount(slug))
                .audioRecordings(audioRecordingService.getCount(slug))
                .videoRecordings(videoRecordingService.getCount(slug))
                .build();
    }
}
