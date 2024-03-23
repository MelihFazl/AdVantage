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



@Service
public class ModelServiceImplementation implements ModelService{


    @Override
    public float getTextualPrediction(String adText) {
        float cpiValue = 0;
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

            // Extract the value associated with the "cpi" key
            cpiValue = responseObject.getCpi();

            // Print the value associated with the "cpi" key
            System.out.println("Value of 'cpi': " + cpiValue);
        } catch (Exception e) {
            e.printStackTrace();
        }

        // Return the CPI value
        return cpiValue;
    }
}

