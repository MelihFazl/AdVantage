package com.advantage.advantage.services;
import com.advantage.advantage.helpers.TextModelAPIResponse;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;


@Service
public class ModelServiceImplementation implements ModelService{


    @Override
    public TextModelAPIResponse getTextualPrediction(String adText) {
        float cpiValue = 0;
        List<Long> shapVal = new ArrayList<>();
        // Define the URL of the external API
        String apiUrl = "http://localhost:8000/text_ad/predict";
        String requestBody = "{\"text_ad\": \"" + adText + "\"}";

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
    public float calculateCPI(String adText){
        TextModelAPIResponse responseObject = getTextualPrediction(adText);
        return responseObject.getCpi();
    }
    @Override
    public List<Long> calculateShapVal(String adText){
        TextModelAPIResponse responseObject = getTextualPrediction(adText);
        return responseObject.getShapleyVal();
    }
}

