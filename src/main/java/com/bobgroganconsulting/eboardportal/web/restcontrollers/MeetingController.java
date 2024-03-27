/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/27/24 : 10:25 AM
 */
package com.bobgroganconsulting.eboardportal.web.restcontrollers;

import com.bobgroganconsulting.eboardportal.dtos.mutation.CreateMeetingDto;
import com.bobgroganconsulting.eboardportal.dtos.mutation.UpdateMeetingDto;
import com.bobgroganconsulting.eboardportal.dtos.query.MeetingDto;
import com.bobgroganconsulting.eboardportal.service.MeetingService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.UUID;

@RestController
@RequestMapping(value = "api/meetings", name = "Meetings")
public class MeetingController {

    private final MeetingService meetingService;

    public MeetingController(MeetingService meetingService) {
        this.meetingService = meetingService;
    }

    @GetMapping
    public ResponseEntity<Page<MeetingDto>> getMeetings(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "page_size", defaultValue = "10") int pageSize,
            @RequestParam(name = "sort_direction", defaultValue = "desc") String sortDirection,
            @RequestParam(name = "sort_by", defaultValue = "createdAt") String sortBy
    ) {
        PageRequest pageRequest = PageRequest.of(page, pageSize, Sort.Direction.fromString(sortDirection), sortBy);
        Page<MeetingDto> meetings = meetingService.findAll(pageRequest);
        return new ResponseEntity<>(meetings, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<MeetingDto> getMeeting(@PathVariable UUID id) {
        MeetingDto meeting = meetingService.findById(id);
        return new ResponseEntity<>(meeting, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<MeetingDto> createMeeting(@RequestBody CreateMeetingDto meetingDto) {
        MeetingDto meeting = meetingService.create(meetingDto);
        URI location = ServletUriComponentsBuilder.fromCurrentRequestUri()
                .path("/{id}")
                .buildAndExpand(meeting.getId())
                .toUri();
        return ResponseEntity.created(location).body(meeting);
    }

    @PutMapping("{id}")
    public ResponseEntity<MeetingDto> updateMeeting(@PathVariable UUID id, @RequestBody UpdateMeetingDto meetingDto) {
        MeetingDto meeting = meetingService.update(id, meetingDto);
        return new ResponseEntity<>(meeting, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteMeeting(@PathVariable UUID id) {
        meetingService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
