/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/15/24 : 11:14 AM
 */
package com.bobgroganconsulting.eboardportal.dtos.query;

import lombok.Builder;
import lombok.Data;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class DocumentDto {
    private UUID id;
    private String fileName;
    private String fileType;
    private long fileSize;
    private long pages;
    private URI uri;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
