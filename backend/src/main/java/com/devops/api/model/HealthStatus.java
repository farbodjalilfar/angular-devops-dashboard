package com.devops.api.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HealthStatus {
    private String status;
    private int latencyMs;
    private double errorRatePct;
    private String lastChecked;
}
