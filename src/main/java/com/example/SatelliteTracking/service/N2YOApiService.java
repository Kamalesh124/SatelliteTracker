package com.example.SatelliteTracking.service;

import com.example.SatelliteTracking.model.SatelliteData; 
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.example.SatelliteTracking.model.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.DeserializationFeature;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.time.Instant;

@Service
@RequiredArgsConstructor
@Slf4j
public class N2YOApiService {
    @Value("${n2yo.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper()
        .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

    private static final String POSITIONS_URL = 
        "https://api.n2yo.com/rest/v1/satellite/positions/{id}/{lat}/{lng}/{alt}/{sec}?apiKey={apiKey}";
    private static final String PASSES_URL =
        "https://api.n2yo.com/rest/v1/satellite/visualpasses/{id}/{lat}/{lng}/{alt}/{days}/{min_visibility}?apiKey={apiKey}";

    public SatelliteData getSatelliteData(int satelliteId) {
        try {
            log.info("Fetching data for satellite ID: {}", satelliteId);

            // Fetch positions
            String posResponseJson = restTemplate.getForObject(
                POSITIONS_URL, String.class, satelliteId, 0, 0, 0, 1, apiKey
            );
            log.debug("Position API Response: {}", posResponseJson);

            // Fetch passes
            String passResponseJson = restTemplate.getForObject(
                PASSES_URL, String.class, satelliteId, 0, 0, 0, 1, 30, apiKey
            );
            log.debug("Pass API Response: {}", passResponseJson);

            // Parse responses
            PositionsResponse posResponse = objectMapper.readValue(posResponseJson, PositionsResponse.class);
            PassesResponse passResponse = objectMapper.readValue(passResponseJson, PassesResponse.class);

            // Validate responses
            if (posResponse == null || posResponse.getInfo() == null || 
                posResponse.getPositions() == null || posResponse.getPositions().length == 0) {
                throw new RuntimeException("Invalid position response for satellite ID: " + satelliteId);
            }

            Position position = posResponse.getPositions()[0];
            String nextPass = "N/A";

            if (passResponse != null && passResponse.getPasses() != null && passResponse.getPasses().length > 0) {
                Pass pass = passResponse.getPasses()[0];
                nextPass = pass.getStartUTC() > 0 ? Instant.ofEpochSecond(pass.getStartUTC()).toString() : "N/A";
            }

            return SatelliteData.builder()
                .satId(satelliteId)
                .satName(posResponse.getInfo().getSatname())
                .latitude(position.getSatlatitude())
                .longitude(position.getSatlongitude())
                .altitude(position.getSataltitude())
                .velocity(position.getSatvelocity())
                .timestamp(Instant.now().toString())
                .nextPass(nextPass)
                .build();

        } catch (Exception e) {
            log.error("Error fetching satellite data: ", e);
            throw new RuntimeException("Failed to retrieve satellite data: " + e.getMessage());
        }
    }
}