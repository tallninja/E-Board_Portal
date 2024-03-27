/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/14/24 : 4:09 PM
 */
package com.bobgroganconsulting.eboardportal.domain.entitylistener;

import com.bobgroganconsulting.eboardportal.domain.entities.VideoRecording;
import jakarta.annotation.PreDestroy;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class VideoRecordingEntityListener {

    @PrePersist
    public void prePersist(VideoRecording video) {
        log.info("Persisted video " + video);
    }

    @PreUpdate
    public void preUpdate(VideoRecording video) {
        log.info("Updated video " + video);
    }

    @PreDestroy
    public void preDestroy(VideoRecording video) {
        log.info("Deleted video " + video);
    }

}
