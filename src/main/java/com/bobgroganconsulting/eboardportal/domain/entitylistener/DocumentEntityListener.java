/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/14/24 : 4:09 PM
 */
package com.bobgroganconsulting.eboardportal.domain.entitylistener;

import com.bobgroganconsulting.eboardportal.domain.entities.Document;
import jakarta.annotation.PreDestroy;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class DocumentEntityListener {

    @PrePersist
    public void prePersist(Document document) {
        log.info("Persisted document " + document);
    }

    @PreUpdate
    public void preUpdate(Document document) {
        log.info("Updated document " + document);
    }

    @PreDestroy
    public void preDestroy(Document document) {
        log.info("Deleted document " + document);
    }

}
