/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/14/24 : 4:58 PM
 */
package com.bobgroganconsulting.eboardportal.repository;

import com.bobgroganconsulting.eboardportal.domain.entities.Meeting;
import com.bobgroganconsulting.eboardportal.domain.entities.VideoRecording;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface VideoRecordingRepository extends JpaRepository<VideoRecording, UUID> {

    @Query("SELECT v FROM VideoRecording v WHERE v.meeting = :meeting")
    Page<VideoRecording> findByMeeting(Meeting meeting, Pageable pageable);

    @Query("SELECT COUNT(v) FROM VideoRecording v WHERE v.meeting = :meeting")
    long count(Meeting meeting);

    @Query("SELECT SUM(v.fileSize) FROM VideoRecording v")
    long storageUsed();

    @Query("SELECT SUM(v.fileSize) FROM VideoRecording v WHERE v.meeting = :meeting")
    long storageUsed(Meeting meeting);

}
