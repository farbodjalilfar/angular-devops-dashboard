package com.devops.api.controller;

import com.devops.api.model.HealthStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/health")
@CrossOrigin(origins = "http://localhost:4200") // Allow Angular to call this
public class HealthController {

    @GetMapping
    public HealthStatus getHealth() {
        // Mocking some real data from the "server"
        return new HealthStatus(
            "ONLINE",
            120,
            0.35,
            LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"))
        );
    }
}
