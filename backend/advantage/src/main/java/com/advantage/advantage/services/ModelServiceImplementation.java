package com.advantage.advantage.services;
import com.advantage.advantage.helpers.ImageModelAPIResponse;
import com.advantage.advantage.helpers.TextModelAPIResponse;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Service
public class ModelServiceImplementation implements ModelService{

    @Override
    public TextModelAPIResponse getTextualPrediction(String adText, float cost, String tone) {
        // Define the URL of the external API
        String apiUrl = "http://localhost:8000/text_ad/predict";
        String requestBody = "{\"text_ad\": \"" + adText + "\", \"spend\": " + cost + ", \"tone\": \"" + tone + "\"}";
        // Create a WebClient instance
        WebClient webClient = WebClient.create();

        // Make the POST request with WebClient
        Mono<String> responseMono = webClient.post()
                .uri(apiUrl)
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(requestBody))
                .retrieve()
                .bodyToMono(String.class);

        // Process the response
        String response = responseMono.block(); // Block and wait for response

        // Parse the response JSON to extract the value associated with the "cpi" key
        try {
            // Parse the response JSON
            // Assuming the response is a JSON object with key-value pairs
            // Replace MyResponseClass with the appropriate class representing your response structure
            TextModelAPIResponse responseObject = new ObjectMapper().readValue(response, TextModelAPIResponse.class);
            return responseObject;
            // Print the value associated with the "cpi" key
        } catch (Exception e) {
            e.printStackTrace();
        }
      return null;
    }

    @Override
    public float calculateCPI(TextModelAPIResponse responseObject) {
        return responseObject.getCpi();
    }


    @Override
    public List<Float> calculateAgeDistribution( TextModelAPIResponse responseObject) {
        return responseObject.getAgeDistribution();
    }

    @Override
    public List<Float> calculateGenderDistribution( TextModelAPIResponse responseObject) {
        return responseObject.getGenderDistribution();
    }

    @Override
    public String calculateTextRecommendation(TextModelAPIResponse response)
    {
        return response.getTextRecommendation();
    }

    @Override
    public ImageModelAPIResponse getImagePrediction(MultipartFile multipartFile) {
        // Define the URL of the external API
        String apiUrl = "http://localhost:8000/image_ad/predict";

        try {
            System.out.println("Debug0");
            // Create a MultipartBodyBuilder to build the multipart request
            MultipartBodyBuilder bodyBuilder = new MultipartBodyBuilder();
            bodyBuilder.part("file", multipartFile.getResource());

            System.out.println("Debug1");
            // Create a WebClient instance with the base URL set to apiUrl
            WebClient webClient = WebClient.builder()
                    .baseUrl(apiUrl)
                    .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.MULTIPART_FORM_DATA_VALUE)
                    .build();

            // Make the POST request with WebClient
            String response = webClient.post()
                    .uri("") // The URI is empty since we already set the base URL to include /predict
                    .contentType(MediaType.MULTIPART_FORM_DATA) // Set content type to multipart/form-data
                    .body(BodyInserters.fromMultipartData(bodyBuilder.build())) // Use BodyInserters.fromMultipartData with the built multipart body
                    .retrieve()
                    .bodyToMono(String.class)
                    .block(); // Block and wait for response

            System.out.println("Debug2");
            System.out.println(response);

            // Parse the response JSON to extract the values
            ObjectMapper objectMapper = new ObjectMapper();
            ImageModelAPIResponse responseObject = objectMapper.readValue(response, ImageModelAPIResponse.class);
            return responseObject;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public float calculateImageCPI(ImageModelAPIResponse responseObject) {
        return responseObject.getCpi();
    }

    @Override
    public Map<Integer, Float> calculateImageAgeDistribution(ImageModelAPIResponse responseObject) {
        return responseObject.getAgeDistribution();
    }

    @Override
    public Map<String, Float> calculateImageGenderDistribution(ImageModelAPIResponse responseObject) {
        return responseObject.getGenderProbabilities();
    }

}

