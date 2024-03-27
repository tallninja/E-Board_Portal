/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/27/24 : 11:50 AM
 */
package com.bobgroganconsulting.eboardportal.constants;

import java.util.List;

public interface FileTypes {
    String MP3 = "mp3";
    String WAV = "wav";
    String REC = "rec";
    String MP4 = "mp4";
    String MPEG = "mpeg";
    String MOV = "mov";
    String PDF = "pdf";
    String DOCX = "docx";
    List<String> ALLOWED_FILE_TYPES = List.of(MP3, WAV, REC, MP4, MPEG, MOV, PDF, DOCX);
}
