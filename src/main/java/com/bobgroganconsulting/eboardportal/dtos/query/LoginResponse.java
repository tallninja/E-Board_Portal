/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/14/24 : 8:25 PM
 */
package com.bobgroganconsulting.eboardportal.dtos.query;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {

    private UserDto user;
    private TokensDto tokens;

}
