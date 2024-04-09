/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 4/9/24 : 12:36 PM
 */
package com.bobgroganconsulting.eboardportal.service.impl;

import com.bobgroganconsulting.eboardportal.dtos.query.StorageDto;
import com.bobgroganconsulting.eboardportal.service.AudioRecordingService;
import com.bobgroganconsulting.eboardportal.service.DocumentService;
import com.bobgroganconsulting.eboardportal.service.StorageUsageService;
import com.bobgroganconsulting.eboardportal.service.VideoRecordingService;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class StorageUsageServiceImpl implements StorageUsageService {

    private final DocumentService documentService;
    private final AudioRecordingService audioRecordingService;
    private final VideoRecordingService videoRecordingService;

    public StorageUsageServiceImpl(DocumentService documentService, AudioRecordingService audioRecordingService, VideoRecordingService videoRecordingService) {
        this.documentService = documentService;
        this.audioRecordingService = audioRecordingService;
        this.videoRecordingService = videoRecordingService;
    }

    @Override
    public StorageDto getStorageUsage() {
        long documents = documentService.getStorageUsed();
        long audioRecordings = audioRecordingService.getStorageUsed();
        long videoRecordings = videoRecordingService.getStorageUsed();
        long totalUsed = getTotalStorageUsed();
        long available = getAvailableStorage();
        long maxCapacity = getMaxStorageCapacity();
        return StorageDto.builder()
                .documents(documents)
                .audioRecordings(audioRecordings)
                .videoRecordings(videoRecordings)
                .totalUsed(totalUsed)
                .available(available)
                .maxCapacity(maxCapacity)
                .build();
    }

    @Override
    public StorageDto getStorageUsage(UUID meetingId) {
        long documents = documentService.getStorageUsed(meetingId);
        long audioRecordings = audioRecordingService.getStorageUsed(meetingId);
        long videoRecordings = videoRecordingService.getStorageUsed(meetingId);
        long totalUsed = getTotalStorageUsed(meetingId);
        long available = getAvailableStorage();
        long maxCapacity = getMaxStorageCapacity();
        return StorageDto.builder()
                .documents(documents)
                .audioRecordings(audioRecordings)
                .videoRecordings(videoRecordings)
                .totalUsed(totalUsed)
                .available(available)
                .maxCapacity(maxCapacity)
                .build();
    }

    @Override
    public StorageDto getStorageUsage(String slug) {
        long documents = documentService.getStorageUsed(slug);
        long audioRecordings = audioRecordingService.getStorageUsed(slug);
        long videoRecordings = videoRecordingService.getStorageUsed(slug);
        long totalUsed = getTotalStorageUsed(slug);
        long available = getAvailableStorage();
        long maxCapacity = getMaxStorageCapacity();
        return StorageDto.builder()
                .documents(documents)
                .audioRecordings(audioRecordings)
                .videoRecordings(videoRecordings)
                .totalUsed(totalUsed)
                .available(available)
                .maxCapacity(maxCapacity)
                .build();
    }

    @Override
    public long getTotalStorageUsed() {
        long documents = documentService.getStorageUsed();
        long audioRecordings = audioRecordingService.getStorageUsed();
        long videoRecordings = videoRecordingService.getStorageUsed();
        return documents + audioRecordings + videoRecordings;
    }

    @Override
    public long getTotalStorageUsed(UUID meetingId) {
        long documents = documentService.getStorageUsed(meetingId);
        long audioRecordings = audioRecordingService.getStorageUsed(meetingId);
        long videoRecordings = videoRecordingService.getStorageUsed(meetingId);
        return documents + audioRecordings + videoRecordings;
    }

    @Override
    public long getTotalStorageUsed(String slug) {
        long documents = documentService.getStorageUsed(slug);
        long audioRecordings = audioRecordingService.getStorageUsed(slug);
        long videoRecordings = videoRecordingService.getStorageUsed(slug);
        return documents + audioRecordings + videoRecordings;
    }

    @Override
    public long getAvailableStorage() {
        long maxStorageCapacity = getMaxStorageCapacity();
        long totalStorageUsed = getTotalStorageUsed();
        return maxStorageCapacity - totalStorageUsed;
    }

    @Override
    public long getMaxStorageCapacity() {
        return 10 * 1000000000L; // 10GB
    }
}
