/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/27/24 : 1:00 PM
 */
package com.bobgroganconsulting.eboardportal.service.impl;

import com.bobgroganconsulting.eboardportal.domain.entities.Meeting;
import com.bobgroganconsulting.eboardportal.dtos.mutation.CreateMeetingDto;
import com.bobgroganconsulting.eboardportal.dtos.mutation.UpdateMeetingDto;
import com.bobgroganconsulting.eboardportal.dtos.query.MeetingDto;
import com.bobgroganconsulting.eboardportal.exceptions.MeetingNotFoundException;
import com.bobgroganconsulting.eboardportal.mapping.MeetingMapper;
import com.bobgroganconsulting.eboardportal.repository.MeetingRepository;
import com.bobgroganconsulting.eboardportal.service.MeetingService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class MeetingServiceImpl implements MeetingService {

    private final MeetingRepository meetingRepository;
    private final MeetingMapper meetingMapper;

    public MeetingServiceImpl(MeetingRepository meetingRepository, MeetingMapper meetingMapper) {
        this.meetingRepository = meetingRepository;
        this.meetingMapper = meetingMapper;
    }

    @Override
    public Page<MeetingDto> findAll(Pageable pageable) {
        Page<Meeting> meetings = meetingRepository.findAll(pageable);
        return meetings.map(meetingMapper::toMeetingDto);
    }

    @Override
    public MeetingDto findById(UUID id) {
        Meeting meeting = findOne(id);
        return meetingMapper.toMeetingDto(meeting);
    }

    @Override
    public MeetingDto create(CreateMeetingDto meetingDto) {
        Meeting meeting = meetingMapper.toMeeting(meetingDto);
        meetingRepository.save(meeting);
        return meetingMapper.toMeetingDto(meeting);
    }

    @Override
    public MeetingDto update(UUID id, UpdateMeetingDto meetingDto) {
        Meeting meeting = findOne(id);
        meeting.setTitle(meetingDto.getTitle());
        meeting.setDate(meetingDto.getDate());
        meeting.setStartTime(meetingDto.getStartTime());
        meeting.setEndTime(meetingDto.getStartTime());
        meetingRepository.save(meeting);
        return meetingMapper.toMeetingDto(meeting);
    }

    @Override
    public void delete(UUID id) {
        Meeting meeting = findOne(id);
        meetingRepository.delete(meeting);
    }

    @Override
    public Meeting findOne(UUID id) {
        return  meetingRepository
                .findById(id)
                .orElseThrow(() -> new MeetingNotFoundException(id));
    }

}
