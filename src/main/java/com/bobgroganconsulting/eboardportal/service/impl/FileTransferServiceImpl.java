/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/12/24 : 4:47 PM
 */
package com.bobgroganconsulting.eboardportal.service.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.bobgroganconsulting.eboardportal.domain.BlobFile;
import com.bobgroganconsulting.eboardportal.exceptions.FileDownloadException;
import com.bobgroganconsulting.eboardportal.service.FileTransferService;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;

@Service
public class FileTransferServiceImpl implements FileTransferService {

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    private final AmazonS3 s3;

    public FileTransferServiceImpl(AmazonS3 s3) {
        this.s3 = s3;
    }

    @Override
    public BlobFile uploadFile(MultipartFile multipartFile) throws Exception {
        Assert.notNull(multipartFile.getOriginalFilename(), "");

        // Convert multipart file to a file
        File file = new File(multipartFile.getOriginalFilename());
        try (FileOutputStream fileOutputStream = new FileOutputStream(file)) {
            fileOutputStream.write(multipartFile.getBytes());
        }

        // Generate file name
        String fileName = generateFileName(multipartFile);
        String fileExtension = FilenameUtils.getExtension(multipartFile.getOriginalFilename());
        long fileSize = file.length();

        // Upload file to S3 bucket
        PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, fileName, file);
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType("plain/" + fileExtension);
        metadata.addUserMetadata("Title", "File Upload - " + fileName);
        metadata.setContentLength(fileSize);
        putObjectRequest.setMetadata(metadata);
        s3.putObject(putObjectRequest);

        // Delete file
        file.delete();

        return BlobFile.builder()
                .fileName(fileName)
                .fileType(fileExtension)
                .fileSize(fileSize)
                .build();
    }

    @Override
    public Object downloadFile(String fileName) throws Exception {
        if (bucketIsEmpty()) {
            throw new FileDownloadException("The requested file " + fileName + " was not found");
        }

        S3Object object = s3.getObject(bucketName, fileName);

        try (S3ObjectInputStream inputStream = object.getObjectContent()) {
            try (FileOutputStream outputStream = new FileOutputStream(fileName)) {
                byte[] read_buffer = new byte[1024];
                int read_len = 0;

                while ((read_len = inputStream.read(read_buffer)) > 0) {
                    outputStream.write(read_buffer, 0, read_len);
                }

                Path filePath = Paths.get(fileName);
                Resource resource = new UrlResource(filePath.toUri());

                if (resource.exists() || resource.isReadable()) {
                    return resource;
                } else {
                    throw new FileDownloadException("File not found.");
                }
            }
        }
    }

    @Override
    public boolean delete(String fileName) {
        File file = Paths.get(fileName).toFile();

        if (file.exists()) {
            file.delete();
            return true;
        }

        return false;
    }

    private boolean bucketIsEmpty() {
        ListObjectsV2Result result = s3.listObjectsV2(bucketName);

        if (result == null) {
            return false;
        }

        List<S3ObjectSummary> blobs = result.getObjectSummaries();
        return blobs.isEmpty();
    }

    private String generateFileName(MultipartFile multipartFile) {
        Assert.notNull(multipartFile.getOriginalFilename(), "");
        return new Date().getTime() + "-" + multipartFile
                .getOriginalFilename()
                .replace(" ", "_");
    }
}
