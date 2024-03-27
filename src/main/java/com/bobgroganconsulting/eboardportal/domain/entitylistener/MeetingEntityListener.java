/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/14/24 : 4:09 PM
 */
package com.bobgroganconsulting.eboardportal.domain.entitylistener;

import com.bobgroganconsulting.eboardportal.domain.entities.Meeting;
import jakarta.annotation.PreDestroy;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class MeetingEntityListener {

    @PrePersist
    public void prePersist(Meeting meeting) {
        log.info("Persisted meeting " + meeting);
    }

    @PreUpdate
    public void preUpdate(Meeting meeting) {
        log.info("Updated meeting " + meeting);
    }

    @PreDestroy
    public void preDestroy(Meeting meeting) {
        log.info("Deleted meeting " + meeting);
    }

}
