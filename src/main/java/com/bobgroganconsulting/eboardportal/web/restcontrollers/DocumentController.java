/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/15/24 : 11:06 AM
 */
package com.bobgroganconsulting.eboardportal.web.restcontrollers;

import com.bobgroganconsulting.eboardportal.dtos.query.DocumentDto;
import com.bobgroganconsulting.eboardportal.service.DocumentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("api/documents")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @GetMapping
    public ResponseEntity<Page<DocumentDto>> getDocuments(
            @RequestParam(name = "meeting_id", required = false) UUID meetingId,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "page_size", defaultValue = "10") int pageSize,
            @RequestParam(name = "sort_direction", defaultValue = "desc") String sortDirection,
            @RequestParam(name = "sort_by", defaultValue = "createdAt") String sortBy
    ) {
        PageRequest pageRequest = PageRequest.of(page, pageSize, Sort.Direction.fromString(sortDirection), sortBy);
        Page<DocumentDto> documents;
        if (meetingId != null) {
            documents = documentService.findAll(meetingId, pageRequest);
        } else {
            documents = documentService.findAll(pageRequest);
        }
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<DocumentDto> getDocument(@PathVariable UUID id) {
        DocumentDto document = documentService.findById(id);
        return new ResponseEntity<>(document, HttpStatus.OK);
    }

    @PostMapping("upload")
    public ResponseEntity<DocumentDto> uploadDocument(
            @RequestParam("meeting_id") UUID meetingId,
            @RequestParam("file") MultipartFile multipartFile
    ) throws Exception {
        DocumentDto document = documentService.upload(meetingId, multipartFile);
        return ResponseEntity.created(document.getUri()).body(document);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteDocument(@PathVariable UUID id) {
        documentService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
