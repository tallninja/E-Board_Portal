/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 4/5/24 : 2:36 PM
 */
package com.bobgroganconsulting.eboardportal.web.restcontrollers;

import com.bobgroganconsulting.eboardportal.dtos.query.CountsDto;
import com.bobgroganconsulting.eboardportal.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("api/statistics")
public class StatsController {

    private final StatsService statsService;

    public StatsController(StatsService statsService) {
        this.statsService = statsService;
    }

    @GetMapping("counts")
    public ResponseEntity<CountsDto> getStatistics() {
        CountsDto counts = statsService.getCounts();
        return new ResponseEntity<>(counts, HttpStatus.OK);
    }

    @GetMapping("counts/meetings/{meetingId}")
    public ResponseEntity<CountsDto> getMeetingStatistics(@PathVariable UUID meetingId) {
        CountsDto counts = statsService.getCounts(meetingId);
        return new ResponseEntity<>(counts, HttpStatus.OK);
    }

}
