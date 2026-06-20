package com.bmog.server.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import java.io.FileInputStream;
import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FirebaseConfig {

  private static final Logger log = LoggerFactory.getLogger(FirebaseConfig.class);

  @Value("${firebase.service-account-path:}")
  private String serviceAccountPath;

  @Bean
  public FirebaseAuth firebaseAuth() throws IOException {
    if (serviceAccountPath == null || serviceAccountPath.isBlank()) {
      log.warn(
          "firebase.service-account-path is not set — Firebase token verification will fail"
              + " until it's configured.");
      return null;
    }

    try (FileInputStream serviceAccount = new FileInputStream(serviceAccountPath)) {
      FirebaseOptions options =
          FirebaseOptions.builder()
              .setCredentials(GoogleCredentials.fromStream(serviceAccount))
              .build();
      FirebaseApp app =
          FirebaseApp.getApps().isEmpty()
              ? FirebaseApp.initializeApp(options)
              : FirebaseApp.getInstance();
      return FirebaseAuth.getInstance(app);
    }
  }
}
