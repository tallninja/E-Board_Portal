/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 4/5/24 : 2:36 PM
 */
package com.bobgroganconsulting.eboardportal.web.restcontrollers;

import com.bobgroganconsulting.eboardportal.dtos.query.CountsDto;
import com.bobgroganconsulting.eboardportal.service.AudioRecordingService;
import com.bobgroganconsulting.eboardportal.service.DocumentService;
import com.bobgroganconsulting.eboardportal.service.MeetingService;
import com.bobgroganconsulting.eboardportal.service.VideoRecordingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/statistics")
public class StatsController {

    private final MeetingService meetingService;
    private final DocumentService documentService;
    private final AudioRecordingService audioRecordingService;
    private final VideoRecordingService videoRecordingService;

    public StatsController(MeetingService meetingService, DocumentService documentService, AudioRecordingService audioRecordingService, VideoRecordingService videoRecordingService) {
        this.meetingService = meetingService;
        this.documentService = documentService;
        this.audioRecordingService = audioRecordingService;
        this.videoRecordingService = videoRecordingService;
    }

    @GetMapping("counts")
    public ResponseEntity<CountsDto> getStatistics() {
        CountsDto counts = CountsDto.builder()
                .meetings(meetingService.getCount())
                .documents(documentService.getCount())
                .audioRecordings(audioRecordingService.getCount())
                .videoRecordings(videoRecordingService.getCount())
                .build();
        return new ResponseEntity<>(counts, HttpStatus.OK);
    }

}
