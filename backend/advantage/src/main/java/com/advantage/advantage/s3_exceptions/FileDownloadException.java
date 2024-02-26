package com.advantage.advantage.s3_exceptions;

public class FileDownloadException extends SpringBootFileUploadException {
    public FileDownloadException(String message) {
        super(message);
    }
}
