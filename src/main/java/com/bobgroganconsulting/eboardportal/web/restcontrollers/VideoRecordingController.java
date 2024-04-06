/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/15/24 : 11:06 AM
 */
package com.bobgroganconsulting.eboardportal.web.restcontrollers;

import com.bobgroganconsulting.eboardportal.dtos.query.VideoRecordingDto;
import com.bobgroganconsulting.eboardportal.dtos.query.VideoRecordingDto;
import com.bobgroganconsulting.eboardportal.service.VideoRecordingService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("api/video-recordings")
public class VideoRecordingController {

    private final VideoRecordingService videoRecordingService;

    public VideoRecordingController(VideoRecordingService videoRecordingService) {
        this.videoRecordingService = videoRecordingService;
    }

    @GetMapping
    public ResponseEntity<Page<VideoRecordingDto>> getVideoRecordings(
            @RequestParam(name = "meeting_id", required = false) UUID meetingId,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "page_size", defaultValue = "10") int pageSize,
            @RequestParam(name = "sort_direction", defaultValue = "desc") String sortDirection,
            @RequestParam(name = "sort_by", defaultValue = "createdAt") String sortBy
    ) {
        PageRequest pageRequest = PageRequest.of(page, pageSize, Sort.Direction.fromString(sortDirection), sortBy);
        Page<VideoRecordingDto> videoRecordings;
        if (meetingId != null) {
            videoRecordings = videoRecordingService.findAll(meetingId, pageRequest);
        } else {
            videoRecordings = videoRecordingService.findAll(pageRequest);
        }
        return new ResponseEntity<>(videoRecordings, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<VideoRecordingDto> getVideoRecording(@PathVariable UUID id) {
        VideoRecordingDto videoRecording = videoRecordingService.findById(id);
        return new ResponseEntity<>(videoRecording, HttpStatus.OK);
    }

    @PostMapping("upload")
    public ResponseEntity<VideoRecordingDto> uploadVideoRecording(
            @RequestParam("meeting_id") UUID meetingId,
            @RequestParam("file") MultipartFile multipartFile
    ) throws Exception {
        VideoRecordingDto videoRecording = videoRecordingService.upload(meetingId, multipartFile);
        return ResponseEntity.created(videoRecording.getUri()).body(videoRecording);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteVideoRecording(@PathVariable UUID id) {
        videoRecordingService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
