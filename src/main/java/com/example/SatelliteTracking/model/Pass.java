package com.example.SatelliteTracking.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Pass {
    @JsonProperty("startUTC")
    private long startUTC;
}