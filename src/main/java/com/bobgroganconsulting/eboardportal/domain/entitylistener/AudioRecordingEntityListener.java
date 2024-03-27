/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/14/24 : 4:09 PM
 */
package com.bobgroganconsulting.eboardportal.domain.entitylistener;

import com.bobgroganconsulting.eboardportal.domain.entities.AudioRecording;
import jakarta.annotation.PreDestroy;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AudioRecordingEntityListener {

    @PrePersist
    public void prePersist(AudioRecording audio) {
        log.info("Persisted audio " + audio);
    }

    @PreUpdate
    public void preUpdate(AudioRecording audio) {
        log.info("Updated audio " + audio);
    }

    @PreDestroy
    public void preDestroy(AudioRecording audio) {
        log.info("Deleted audio " + audio);
    }

}
