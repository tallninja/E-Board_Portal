/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 4/9/24 : 1:00 PM
 */
package com.bobgroganconsulting.eboardportal.web.restcontrollers;

import com.bobgroganconsulting.eboardportal.dtos.query.StorageDto;
import com.bobgroganconsulting.eboardportal.service.StorageUsageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("api/storage")
public class StorageUsageController {

    private final StorageUsageService storageUsageService;

    public StorageUsageController(StorageUsageService storageUsageService) {
        this.storageUsageService = storageUsageService;
    }

    @GetMapping
    public ResponseEntity<StorageDto> getStorageUsage() {
        StorageDto storageUsage = storageUsageService.getStorageUsage();
        return new ResponseEntity<>(storageUsage, HttpStatus.OK);
    }

    @GetMapping("meetings/{meetingId}")
    public ResponseEntity<StorageDto> getStorageUsage(@PathVariable UUID meetingId) {
        StorageDto storageUsage = storageUsageService.getStorageUsage(meetingId);
        return new ResponseEntity<>(storageUsage, HttpStatus.OK);
    }

}
