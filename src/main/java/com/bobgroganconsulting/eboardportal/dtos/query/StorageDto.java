/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 4/9/24 : 12:30 PM
 */
package com.bobgroganconsulting.eboardportal.dtos.query;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StorageDto {
    private long documents;
    private long audioRecordings;
    private long videoRecordings;
    private long totalUsed;
    private long available;
    private long maxCapacity;
}
