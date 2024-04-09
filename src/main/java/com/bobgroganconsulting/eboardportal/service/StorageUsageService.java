/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 4/9/24 : 12:34 PM
 */
package com.bobgroganconsulting.eboardportal.service;

import com.bobgroganconsulting.eboardportal.dtos.query.StorageDto;

import java.util.UUID;

public interface StorageUsageService {
    StorageDto getStorageUsage();
    StorageDto getStorageUsage(UUID meetingId);
    StorageDto getStorageUsage(String slug);
    long getTotalStorageUsed();
    long getTotalStorageUsed(UUID meetingId);
    long getTotalStorageUsed(String slug);
    long getAvailableStorage();
    long getMaxStorageCapacity();
}
