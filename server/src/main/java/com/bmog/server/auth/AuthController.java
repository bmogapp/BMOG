package com.bmog.server.auth;

import com.bmog.server.auth.dto.VerifyTokenRequest;
import com.bmog.server.auth.dto.VerifyTokenResponse;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired(required = false)
  private FirebaseAuth firebaseAuth;

  @PostMapping("/verify")
  public ResponseEntity<?> verify(@Valid @RequestBody VerifyTokenRequest request) {
    if (firebaseAuth == null) {
      return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
          .body("Firebase is not configured on this server yet.");
    }

    try {
      FirebaseToken token = firebaseAuth.verifyIdToken(request.idToken());
      String phoneNumber = (String) token.getClaims().get("phone_number");
      return ResponseEntity.ok(new VerifyTokenResponse(token.getUid(), phoneNumber));
    } catch (FirebaseAuthException e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired ID token.");
    }
  }
}
