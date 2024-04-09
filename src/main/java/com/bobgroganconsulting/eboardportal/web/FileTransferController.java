/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/12/24 : 5:47 PM
 */
package com.bobgroganconsulting.eboardportal.web;

import com.bobgroganconsulting.eboardportal.dtos.BlobFile;
import com.bobgroganconsulting.eboardportal.exceptions.FileSizeException;
import com.bobgroganconsulting.eboardportal.service.FileTransferService;
import jakarta.validation.constraints.NotBlank;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Slf4j
@RestController
@RequestMapping(value = "files")
public class FileTransferController {

    private final FileTransferService fileTransferService;

    public FileTransferController(FileTransferService fileTransferService) {
        this.fileTransferService = fileTransferService;
    }

    @PostMapping(value = "upload")
    public ResponseEntity<Map<String, Object>> upload(@RequestParam("file") MultipartFile multipartFile) throws Exception {
        if (multipartFile.isEmpty()) {
            throw new FileSizeException("File appears to be empty.");
        }

        boolean isValidFile = isValidFile(multipartFile);
        List<String> allowedFileExtensions = List.of(
                "pdf", "docs", "txt",
                "mp4", "mpeg",
                "mp3", "wav"
        );

        String fileExtension = FilenameUtils.getExtension(multipartFile.getOriginalFilename());
        Map<String, Object> response = new HashMap<>();

        if (isValidFile && allowedFileExtensions.contains(fileExtension)){
            BlobFile blobFile = fileTransferService.uploadFile(multipartFile);
            response.put("message", "File uploaded successfully!");
            response.put("data", blobFile);
            return ResponseEntity.ok().body(response);
        } else {
            response.put("message", "Invalid file");
            return ResponseEntity.badRequest().body(response);
        }

    }

    @GetMapping(value = "download")
    public ResponseEntity<Object> download(@RequestParam("file_name") @NotBlank String fileName) throws Exception {
        Object file = fileTransferService.downloadFile(fileName);
        if (file != null){
            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" + fileName + "\"")
                    .body(file);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(@RequestParam("file_name") @NotBlank String fileName){
        fileTransferService.delete(fileName);
        return ResponseEntity.noContent().build();
    }

    private boolean isValidFile(MultipartFile multipartFile){
        log.info("Empty Status ==> {}", multipartFile.isEmpty());
        if (Objects.isNull(multipartFile.getOriginalFilename())){
            return false;
        }
        return !multipartFile.getOriginalFilename().trim().equals("");
    }

}
