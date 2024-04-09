/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/27/24 : 12:57 PM
 */
package com.bobgroganconsulting.eboardportal.dtos.mutation;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
public class UpdateMeetingDto {

    @NotBlank
    private String title;

    @NotNull
    private LocalDate date;

    @NotNull
    private LocalTime startTime;

    @NotNull
    private LocalTime endTime;

    private String description;

}
