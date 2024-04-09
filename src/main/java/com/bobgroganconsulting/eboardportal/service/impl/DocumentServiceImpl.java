/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/27/24 : 11:05 AM
 */
package com.bobgroganconsulting.eboardportal.service.impl;

import com.bobgroganconsulting.eboardportal.constants.DocumentFileTypes;
import com.bobgroganconsulting.eboardportal.domain.entities.Document;
import com.bobgroganconsulting.eboardportal.domain.entities.Meeting;
import com.bobgroganconsulting.eboardportal.dtos.BlobFile;
import com.bobgroganconsulting.eboardportal.dtos.query.DocumentDto;
import com.bobgroganconsulting.eboardportal.exceptions.DocumentNotFoundException;
import com.bobgroganconsulting.eboardportal.mapping.DocumentMapper;
import com.bobgroganconsulting.eboardportal.repository.DocumentRepository;
import com.bobgroganconsulting.eboardportal.service.DocumentService;
import com.bobgroganconsulting.eboardportal.service.FileTransferService;
import com.bobgroganconsulting.eboardportal.service.MeetingService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import static com.bobgroganconsulting.eboardportal.service.utils.FileTransferUtils.*;

import java.util.UUID;

@Service
public class DocumentServiceImpl implements DocumentService {

    private final DocumentRepository documentRepository;
    private final DocumentMapper documentMapper;
    private final MeetingService meetingService;
    private final FileTransferService fileTransferService;

    public DocumentServiceImpl(DocumentRepository documentRepository, DocumentMapper documentMapper, MeetingService meetingService, FileTransferService fileTransferService) {
        this.documentRepository = documentRepository;
        this.documentMapper = documentMapper;
        this.meetingService = meetingService;
        this.fileTransferService = fileTransferService;
    }

    @Override
    public Page<DocumentDto> findAll(Pageable pageable) {
        Page<Document> documents = documentRepository.findAll(pageable);
        return documents.map(documentMapper::toDocumentDto);
    }

    @Override
    public Page<DocumentDto> findAll(UUID meetingId, Pageable pageable) {
        Meeting meeting = meetingService.findOne(meetingId);
        Page<Document> documents = documentRepository.findByMeeting(meeting, pageable);
        return documents.map(documentMapper::toDocumentDto);
    }

    @Override
    public long getCount() {
        return documentRepository.count();
    }

    @Override
    public long getCount(UUID meetingId) {
        Meeting meeting = meetingService.findOne(meetingId);
        return documentRepository.count(meeting);
    }

    @Override
    public long getStorageUsed() {
        return documentRepository.storageUsed();
    }

    @Override
    public long getStorageUsed(UUID meetingId) {
        Meeting meeting = meetingService.findOne(meetingId);
        return documentRepository.storageUsed(meeting);
    }

    @Override
    public DocumentDto findById(UUID id) {
        Document document = findOne(id);
        return documentMapper.toDocumentDto(document);
    }

    @Override
    public DocumentDto upload(UUID meetingId, MultipartFile multipartFile) throws Exception {
        Meeting meeting = meetingService.findOne(meetingId);
        assertFileTypeIsValid(multipartFile, DocumentFileTypes.ALLOWED_FILE_TYPES);
        BlobFile blobFile = fileTransferService.uploadFile(multipartFile);
        Document document = documentMapper.toDocument(blobFile);
        document.setMeeting(meeting);
        documentRepository.save(document);
        return documentMapper.toDocumentDto(document);
    }

    @Override
    public void delete(UUID id) {
        Document document = findOne(id);
        documentRepository.delete(document);
    }

    private Document findOne(UUID id) {
        return documentRepository
                .findById(id)
                .orElseThrow(() -> new DocumentNotFoundException(id));
    }

}
