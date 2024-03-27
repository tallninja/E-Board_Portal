/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/14/24 : 8:26 PM
 */
package com.bobgroganconsulting.eboardportal.dtos.query;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDto {

    private String firstName;
    private String middleName;
    private String lastName;
    private String fullName;
    private String email;
    private String phoneNumber;

}
