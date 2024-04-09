/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/14/24 : 4:59 PM
 */
package com.bobgroganconsulting.eboardportal.repository;

import com.bobgroganconsulting.eboardportal.domain.entities.Document;
import com.bobgroganconsulting.eboardportal.domain.entities.Meeting;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DocumentRepository extends JpaRepository<Document, UUID> {

    @Query("SELECT d FROM Document d WHERE d.meeting = :meeting")
    Page<Document> findByMeeting(Meeting meeting, Pageable pageable);

    @Query("SELECT COUNT(d) FROM Document d WHERE d.meeting = :meeting")
    long count(Meeting meeting);

}
