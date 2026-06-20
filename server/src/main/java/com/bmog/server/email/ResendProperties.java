package com.bmog.server.email;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "resend")
public class ResendProperties {

  private String apiKey = "";
  private String from = "noreply@bmog.app";

  public String getApiKey() {
    return apiKey;
  }

  public void setApiKey(String apiKey) {
    this.apiKey = apiKey;
  }

  public String getFrom() {
    return from;
  }

  public void setFrom(String from) {
    this.from = from;
  }

  public boolean isConfigured() {
    return !apiKey.isBlank();
  }
}
