/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/14/24 : 4:59 PM
 */
package com.bobgroganconsulting.eboardportal.repository;

import com.bobgroganconsulting.eboardportal.domain.entities.AudioRecording;
import com.bobgroganconsulting.eboardportal.domain.entities.Meeting;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AudioRecordingRepository extends JpaRepository<AudioRecording, UUID> {

    @Query("SELECT a FROM AudioRecording a WHERE a.meeting = :meeting")
    Page<AudioRecording> findByMeeting(Meeting meeting, Pageable pageable);

    @Query("SELECT COUNT(a) FROM AudioRecording a WHERE a.meeting = :meeting")
    long count(Meeting meeting);

    @Query("SELECT SUM(a.fileSize) FROM AudioRecording a")
    long storageUsed();

    @Query("SELECT SUM(a.fileSize) FROM AudioRecording a WHERE a.meeting = :meeting")
    long storageUsed(Meeting meeting);

}
