package com.example.SatelliteTracking.controller;

import com.example.SatelliteTracking.model.SatelliteData;
import com.example.SatelliteTracking.service.N2YOApiService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@CrossOrigin(origins = {"http://localhost:5173", "https://satellite-tracker-seven.vercel.app"})
@RestController
@RequestMapping("/satellite")
public class SatelliteController {
    
    private final N2YOApiService n2yoApiService;

    // Load API key from application.properties or environment variable
    @Value("${n2yo.api.key}")  
    private String apiKey;

    public SatelliteController(N2YOApiService n2yoApiService) {
        this.n2yoApiService = n2yoApiService;
    }

    @GetMapping("/{satelliteId}")
    public SatelliteData getSatellite(@PathVariable int satelliteId) {
        return n2yoApiService.getSatelliteData(satelliteId);
    }

    @GetMapping("/predictPasses")
    public String predictPasses(
            @RequestParam String satelliteId,
            @RequestParam String lat,
            @RequestParam String lng) {

        String url = "https://api.n2yo.com/rest/v1/satellite/visualpasses/"
                     + satelliteId + "/" + lat + "/" + lng + "/0/2/300?apiKey=" + apiKey;

        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }
}
