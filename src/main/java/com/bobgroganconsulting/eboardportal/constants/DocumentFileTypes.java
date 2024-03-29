/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/14/24 : 4:52 PM
 */
package com.bobgroganconsulting.eboardportal.constants;

import java.util.List;

public interface DocumentFileTypes {
    String PDF = "pdf";
    String DOCX = "docx";
    List<String> ALLOWED_FILE_TYPES = List.of(PDF, DOCX);
}
