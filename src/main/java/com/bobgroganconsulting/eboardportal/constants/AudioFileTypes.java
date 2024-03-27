/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/14/24 : 4:52 PM
 */
package com.bobgroganconsulting.eboardportal.constants;

import java.util.List;

public interface AudioFileTypes {
    String MP3 = "mp3";
    String WAV = "wav";
    String REC = "rec";
    List<String> ALLOWED_FILE_TYPES = List.of(MP3, WAV, REC);
}
