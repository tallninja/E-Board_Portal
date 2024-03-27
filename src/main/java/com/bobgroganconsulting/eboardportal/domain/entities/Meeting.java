/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/14/24 : 4:07 PM
 */
package com.bobgroganconsulting.eboardportal.domain.entities;

import com.bobgroganconsulting.eboardportal.domain.entitylistener.MeetingEntityListener;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@SuperBuilder(toBuilder = true)
@Entity(name = "Meeting")
@Table(name = "meetings")
@EntityListeners(MeetingEntityListener.class)
public class Meeting extends BaseEntityAudit<Meeting> {

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @OneToMany(mappedBy = "meeting")
    private List<Document> documents;

    @OneToMany(mappedBy = "meeting")
    private List<AudioRecording> audioRecordings;

    @OneToMany(mappedBy = "meeting")
    private List<VideoRecording> videoRecordings;

}
