/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 4/5/24 : 2:40 PM
 */
package com.bobgroganconsulting.eboardportal.dtos.query;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CountsDto {
    private long meetings;
    private long documents;
    private long audioRecordings;
    private long videoRecordings;
}
