/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/14/24 : 8:24 PM
 */
package com.bobgroganconsulting.eboardportal.dtos.mutation;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginRequest {

    @NotBlank
    private final String email;

    @NotBlank
    private final String password;

}
