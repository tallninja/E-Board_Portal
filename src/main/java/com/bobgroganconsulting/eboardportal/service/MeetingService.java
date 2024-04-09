/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/27/24 : 12:55 PM
 */
package com.bobgroganconsulting.eboardportal.service;

import com.bobgroganconsulting.eboardportal.domain.entities.Meeting;
import com.bobgroganconsulting.eboardportal.dtos.mutation.CreateMeetingDto;
import com.bobgroganconsulting.eboardportal.dtos.mutation.UpdateMeetingDto;
import com.bobgroganconsulting.eboardportal.dtos.query.MeetingDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface MeetingService {

    Page<MeetingDto> findAll(Pageable pageable);
    Page<MeetingDto> findAllToday(Pageable pageable);
    Page<MeetingDto> findAllUpcoming(Pageable pageable);
    MeetingDto findById(UUID id);
    MeetingDto findBySlug(String slug);
    long getCount();
    MeetingDto create(CreateMeetingDto meetingDto);
    MeetingDto update(UUID id, UpdateMeetingDto meetingDto);
    void delete(UUID id);
    Meeting findOne(UUID id);
    Meeting findOne(String slug);

}
