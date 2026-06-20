package com.bmog.server.payment;

import com.bmog.server.payment.dto.ChargeRequest;
import com.bmog.server.payment.dto.ChargeResponse;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

@Service
public class TapPayService {

  private final TapPayProperties properties;
  private final RestClient restClient;

  public TapPayService(TapPayProperties properties) {
    this.properties = properties;
    this.restClient = RestClient.create();
  }

  public ChargeResponse payByPrime(ChargeRequest request) {
    Map<String, Object> body = new LinkedHashMap<>();
    body.put("prime", request.prime());
    body.put("partner_key", properties.getPartnerKey());
    body.put("merchant_id", properties.getMerchantId());
    body.put("amount", request.amount());
    body.put("currency", request.currency());
    body.put("details", request.details());
    body.put(
        "cardholder",
        Map.of(
            "phone_number", request.cardholder().phoneNumber(),
            "name", request.cardholder().name() == null ? "" : request.cardholder().name(),
            "email", request.cardholder().email() == null ? "" : request.cardholder().email()));

    try {
      String rawBody =
          restClient
              .post()
              .uri(properties.payByPrimeUrl())
              .header("Content-Type", "application/json")
              .header("x-api-key", properties.getPartnerKey())
              .body(body)
              .retrieve()
              .body(String.class);
      return new ChargeResponse(200, "ok", rawBody);
    } catch (RestClientResponseException e) {
      return new ChargeResponse(
          e.getStatusCode().value(), "TapPay request failed", e.getResponseBodyAsString());
    }
  }
}
