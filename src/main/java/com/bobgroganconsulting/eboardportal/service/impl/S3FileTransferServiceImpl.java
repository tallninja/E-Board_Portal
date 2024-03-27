/**
 * Author: Ernest Wambua
 * Email: ernestwambua2@gmail.com
 * Date: 3/12/24 : 4:47 PM
 */
package com.bobgroganconsulting.eboardportal.service.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.bobgroganconsulting.eboardportal.dtos.BlobFile;
import com.bobgroganconsulting.eboardportal.exceptions.FileDownloadException;
import com.bobgroganconsulting.eboardportal.service.FileTransferService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import static com.bobgroganconsulting.eboardportal.service.utils.FileTransferUtils.*;

import java.io.File;
import java.io.FileOutputStream;
import java.net.URI;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class S3FileTransferServiceImpl implements FileTransferService {

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    private final AmazonS3 s3;

    public S3FileTransferServiceImpl(AmazonS3 s3) {
        this.s3 = s3;
    }

    @Override
    public BlobFile uploadFile(MultipartFile multipartFile) throws Exception {
        assertFileIsValid(multipartFile);

        // Convert multipart file to a file
        File file = convertMultipartFileToFile(multipartFile);
        String fileName = generateFileName(multipartFile);
        String fileExtension = getFileExtension(multipartFile);
        long fileSize = file.length();

        // Upload file to S3 bucket
        uploadFileToS3Bucket(file, fileName, fileExtension, fileSize);

        // Delete file
        file.delete();

        //https://bg-blob-repository.s3.af-south-1.amazonaws.com/1710261797939-test_file.txt
        URI uri = URI.create("https://" + bucketName + ".s3." + s3.getRegionName() + ".amazonaws.com/" + fileName);
        return BlobFile.builder()
                .fileName(fileName)
                .fileType(fileExtension)
                .fileSize(fileSize)
                .uri(uri)
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

    private void uploadFileToS3Bucket(File file, String fileName, String fileExtension, long fileSize) {
        PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, fileName, file);
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType("plain/" + fileExtension);
        metadata.addUserMetadata("Title", "File Upload - " + fileName);
        metadata.setContentLength(fileSize);
        putObjectRequest.setMetadata(metadata);
        s3.putObject(putObjectRequest);
    }

    private boolean bucketIsEmpty() {
        ListObjectsV2Result result = s3.listObjectsV2(bucketName);

        if (result == null) {
            return false;
        }

        List<S3ObjectSummary> blobs = result.getObjectSummaries();
        return blobs.isEmpty();
    }

}
