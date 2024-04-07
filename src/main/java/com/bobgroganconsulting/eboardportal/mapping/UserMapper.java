/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/14/24 : 8:33 PM
 */
package com.bobgroganconsulting.eboardportal.mapping;

import com.bobgroganconsulting.eboardportal.domain.entities.User;
import com.bobgroganconsulting.eboardportal.dtos.mutation.CreateUserDto;
import com.bobgroganconsulting.eboardportal.dtos.query.UserDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toUser(CreateUserDto userDto);

    User toUser(UserDto userDto);

//    @Mapping(
//            target = "fullName",
//            expression = "java(user.getFirstName().concat(\" \") + user.getMiddleName().concat(\" \") + user.getLastName())"
//    )
    UserDto toUserDto(User user);

}
