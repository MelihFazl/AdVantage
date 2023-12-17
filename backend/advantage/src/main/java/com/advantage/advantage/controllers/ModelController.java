package com.advantage.advantage.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/model")
@CrossOrigin
public class ModelController {

    @PostMapping("/predict")
    public ResponseEntity<?> predict(@RequestBody Map<String, String> requestData) {
        try {
            // Extract the input string from the map
            String inputString = requestData.get("inputString");

            // Build the command to execute the Python script
            String projectPath = System.getProperty("user.dir");
            String pythonScriptPath = projectPath + "/src/main/resources/model/modify_string2.py";
            Process process = new ProcessBuilder("python", pythonScriptPath, inputString)
                    .start();

            // Wait for the process to finish
            int exitCode = process.waitFor();

            if (exitCode == 0) {
                // Read the output of the Python script from process.getInputStream()
                InputStream inputStream = process.getInputStream();
                BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));

                // Read the modified string from the Python script's output
                String modifiedString = reader.readLine();

                // You can now use modifiedString as the result and return it in the ResponseEntity
                return ResponseEntity.ok(modifiedString);
            } else {
                // Handle errors
                InputStream errorStream = process.getErrorStream();
                BufferedReader reader = new BufferedReader(new InputStreamReader(errorStream));

                // Read and print the error message
                String errorMessage = reader.readLine();
                System.err.println("Error: " + errorMessage);

                // Handle the error and return an appropriate response
                return ResponseEntity.status(500).body("Error occurred while running the Python script");
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            // Handle exceptions
            return ResponseEntity.status(500).body("Internal Server Error");
        }
    }
}
