/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/14/24 : 4:25 PM
 */
package com.bobgroganconsulting.eboardportal.domain.entities;

import com.bobgroganconsulting.eboardportal.domain.entitylistener.VideoRecordingEntityListener;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.net.URI;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@SuperBuilder(toBuilder = true)
@Entity(name = "VideoRecording")
@Table(name = "video_recordings")
@EntityListeners(VideoRecordingEntityListener.class)
public class VideoRecording extends BaseEntityAudit<VideoRecording> {

    @ToString.Exclude
    @ManyToOne(optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "meeting_id", referencedColumnName = "id")
    private Meeting meeting;

    @Column(name = "file_name", nullable = false)
    private String fileName;

    @Column(name = "file_type", nullable = false)
    private String fileType;

    @Column(name = "file_size", nullable = false)
    private long fileSize;

    @Column(name = "duration")
    private long duration;

    @Column(name = "uri")
    private URI uri;

}
