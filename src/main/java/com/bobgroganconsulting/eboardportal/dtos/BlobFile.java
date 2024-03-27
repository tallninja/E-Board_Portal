/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/12/24 : 4:41 PM
 */
package com.bobgroganconsulting.eboardportal.dtos;

import lombok.*;

import java.net.URI;

@Data
@Builder
public class BlobFile {

    private String fileName;
    private String fileType;
    private long fileSize;
    private URI uri;

}
