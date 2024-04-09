/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/14/24 : 4:21 PM
 */
package com.bobgroganconsulting.eboardportal.repository;

import com.bobgroganconsulting.eboardportal.domain.entities.Meeting;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, UUID> {

    Optional<Meeting> findBySlug(String slug);

    @Query("SELECT m FROM Meeting m WHERE m.date = :date")
    Page<Meeting> findAllOnDate(LocalDate date, Pageable pageable);

    @Query("SELECT m FROM Meeting m WHERE m.date > :date")
    Page<Meeting> findAllAfterDate(LocalDate date, Pageable pageable);

}
