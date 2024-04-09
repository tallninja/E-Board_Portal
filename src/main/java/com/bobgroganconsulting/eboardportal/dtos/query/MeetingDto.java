/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/18/24 : 11:22 AM
 */
package com.bobgroganconsulting.eboardportal.dtos.query;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

@Data
@Builder
public class MeetingDto {

    private UUID id;
    private String slug;
    private String title;
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
