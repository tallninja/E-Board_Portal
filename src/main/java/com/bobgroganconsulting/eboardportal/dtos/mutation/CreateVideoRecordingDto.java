/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/27/24 : 11:03 AM
 */
package com.bobgroganconsulting.eboardportal.dtos.mutation;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateVideoRecordingDto {
    private String fileName;
    private String fileType;
    private long fileSize;
    private long duration;
}
