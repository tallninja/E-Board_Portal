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
    long getTotalStorageUsed();
    long getTotalStorageUsed(UUID meetingId);
    long getAvailableStorage();
    long getMaxStorageCapacity();
}
