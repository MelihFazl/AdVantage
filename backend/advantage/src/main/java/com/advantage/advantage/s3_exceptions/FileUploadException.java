package com.advantage.advantage.s3_exceptions;

public class FileUploadException extends SpringBootFileUploadException{
    public FileUploadException(String message) {
        super(message);
    }
}
