/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/15/24 : 11:06 AM
 */
package com.bobgroganconsulting.eboardportal.web.restcontrollers;

import com.bobgroganconsulting.eboardportal.dtos.query.AudioRecordingDto;
import com.bobgroganconsulting.eboardportal.service.AudioRecordingService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("api/audio_recordings")
public class AudioRecordingController {

    private final AudioRecordingService audioRecordingService;

    public AudioRecordingController(AudioRecordingService audioRecordingService) {
        this.audioRecordingService = audioRecordingService;
    }

    @GetMapping
    public ResponseEntity<Page<AudioRecordingDto>> getAudioRecordings(
            @RequestParam(name = "meeting_id", required = false) UUID meetingId,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "page_size", defaultValue = "10") int pageSize,
            @RequestParam(name = "sort_direction", defaultValue = "desc") String sortDirection,
            @RequestParam(name = "sort_by", defaultValue = "createdAt") String sortBy
    ) {
        PageRequest pageRequest = PageRequest.of(page, pageSize, Sort.Direction.fromString(sortDirection), sortBy);
        Page<AudioRecordingDto> audioRecordings;
        if (meetingId != null) {
            audioRecordings = audioRecordingService.findAll(meetingId, pageRequest);
        } else {
            audioRecordings = audioRecordingService.findAll(pageRequest);
        }
        return new ResponseEntity<>(audioRecordings, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<AudioRecordingDto> getAudioRecording(@PathVariable UUID id) {
        AudioRecordingDto audioRecording = audioRecordingService.findById(id);
        return new ResponseEntity<>(audioRecording, HttpStatus.OK);
    }

    @PostMapping("upload")
    public ResponseEntity<AudioRecordingDto> uploadAudioRecording(
            @RequestParam("meeting_id") UUID meetingId,
            @RequestParam("file") MultipartFile multipartFile
    ) throws Exception {
        AudioRecordingDto audioRecording = audioRecordingService.upload(meetingId, multipartFile);
        return ResponseEntity.created(audioRecording.getUri()).body(audioRecording);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteAudioRecording(@PathVariable UUID id) {
        audioRecordingService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
