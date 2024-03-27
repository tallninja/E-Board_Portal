/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/15/24 : 8:45 AM
 */
package com.bobgroganconsulting.eboardportal.domain.entitylistener;

import com.bobgroganconsulting.eboardportal.domain.entities.RefreshToken;
import jakarta.persistence.PostPersist;
import jakarta.persistence.PostRemove;
import jakarta.persistence.PostUpdate;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class RefreshTokenEntityListener {

    @PostPersist
    public void postPersist(RefreshToken refreshToken) {
        log.info("Persisted refresh token " + refreshToken);
    }

    @PostUpdate
    public void postUpdate(RefreshToken refreshToken) {
        log.info("Updated refresh token " + refreshToken);
    }

    @PostRemove
    public void postRemove(RefreshToken refreshToken) {
        log.info("Removed refresh token " + refreshToken);
    }

}
