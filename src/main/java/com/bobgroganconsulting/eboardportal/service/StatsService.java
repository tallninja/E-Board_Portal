/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 4/9/24 : 11:17 AM
 */
package com.bobgroganconsulting.eboardportal.service;

import com.bobgroganconsulting.eboardportal.dtos.query.CountsDto;

import java.util.UUID;

public interface StatsService {

    CountsDto getCounts();
    CountsDto getCounts(UUID meetingId);
    CountsDto getCounts(String slug);

}
