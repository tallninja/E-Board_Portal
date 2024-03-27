/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/15/24 : 9:26 AM
 */
package com.bobgroganconsulting.eboardportal.dtos.query;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TokensDto {

    private String accessToken;
    private String refreshToken;
    private long expires;

}
