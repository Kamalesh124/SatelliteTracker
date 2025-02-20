package com.example.SatelliteTracking.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SatelliteData {
    private int satId;
    private String satName;
    private double latitude;
    private double longitude;
    private double altitude;
    private double velocity;
    private String timestamp;
    private String nextPass;
}