package com.advantage.advantage.s3_exceptions;

public class FileEmptyException extends SpringBootFileUploadException{
    public FileEmptyException(String message) {
        super(message);
    }
}
