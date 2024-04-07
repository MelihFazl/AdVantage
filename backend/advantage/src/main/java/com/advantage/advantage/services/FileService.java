package com.advantage.advantage.services;

import com.advantage.advantage.s3_exceptions.FileDownloadException;
import com.advantage.advantage.s3_exceptions.FileUploadException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
public interface FileService {
    String uploadFile(MultipartFile multipartFile) throws FileUploadException, IOException;

    Object downloadFile(String fileName) throws FileDownloadException, IOException;

    boolean delete(String fileName);

    boolean deleteObject(String fileName);
}
