package com.bmog.server.payment;

import com.bmog.server.payment.dto.ChargeRequest;
import com.bmog.server.payment.dto.ChargeResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

  private final TapPayService tapPayService;
  private final TapPayProperties properties;

  public PaymentController(TapPayService tapPayService, TapPayProperties properties) {
    this.tapPayService = tapPayService;
    this.properties = properties;
  }

  @PostMapping("/charge")
  public ResponseEntity<?> charge(@Valid @RequestBody ChargeRequest request) {
    if (!properties.isConfigured()) {
      return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
          .body("TapPay is not configured on this server yet.");
    }

    ChargeResponse response = tapPayService.payByPrime(request);
    return ResponseEntity.status(response.status()).body(response);
  }
}
