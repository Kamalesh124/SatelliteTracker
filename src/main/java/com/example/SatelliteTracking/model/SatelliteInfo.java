package com.example.SatelliteTracking.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class SatelliteInfo {
    private String satname;
    private int satid;
}