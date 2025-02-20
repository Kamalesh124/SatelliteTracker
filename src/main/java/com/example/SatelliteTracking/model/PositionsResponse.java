package com.example.SatelliteTracking.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PositionsResponse {
    private SatelliteInfo info; // Use SatelliteInfo instead of Info
    private Position[] positions;
}