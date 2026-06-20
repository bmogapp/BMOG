package com.bmog.server.email;

import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

@Service
public class ResendEmailService {

  private static final Logger log = LoggerFactory.getLogger(ResendEmailService.class);
  private static final String RESEND_API_URL = "https://api.resend.com/emails";

  private final ResendProperties properties;
  private final RestClient restClient;

  public ResendEmailService(ResendProperties properties) {
    this.properties = properties;
    this.restClient = RestClient.create();
  }

  public boolean send(String to, String subject, String html) {
    if (!properties.isConfigured()) {
      log.warn("resend.api-key is not set — skipping email send to {}", to);
      return false;
    }

    try {
      restClient
          .post()
          .uri(RESEND_API_URL)
          .header("Authorization", "Bearer " + properties.getApiKey())
          .header("Content-Type", "application/json")
          .body(
              Map.of(
                  "from", properties.getFrom(),
                  "to", to,
                  "subject", subject,
                  "html", html))
          .retrieve()
          .toBodilessEntity();
      return true;
    } catch (RestClientResponseException e) {
      log.error("Resend email send failed: {}", e.getResponseBodyAsString());
      return false;
    }
  }
}
