/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/14/24 : 3:37 PM
 */
package com.bobgroganconsulting.eboardportal.domain.entitylistener;

import com.bobgroganconsulting.eboardportal.domain.entities.User;
import jakarta.persistence.PostPersist;
import jakarta.persistence.PostRemove;
import jakarta.persistence.PostUpdate;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class UserEntityListener {

    @PostPersist
    public void postPersist(User user) {
        log.info("Persisted user " + user);
    }

    @PostUpdate
    public void postUpdate(User user) {
        log.info("Updated user " + user);
    }

    @PostRemove
    public void postRemove(User user) {
        log.info("Removed user " + user);
    }

}
