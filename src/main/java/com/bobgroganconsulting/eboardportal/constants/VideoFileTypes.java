/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/14/24 : 4:52 PM
 */
package com.bobgroganconsulting.eboardportal.constants;

import java.util.List;

public interface VideoFileTypes {
    String MP4 = "mp4";
    String MPEG = "mpeg";
    String MOV = "mov";
    List<String> ALLOWED_FILE_TYPES = List.of(MP4, MPEG, MOV);
}
