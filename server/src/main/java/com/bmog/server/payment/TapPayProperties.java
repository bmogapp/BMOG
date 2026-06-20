package com.bmog.server.payment;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "tappay")
public class TapPayProperties {

  private String partnerKey = "";
  private String merchantId = "";
  private boolean sandbox = true;

  public String getPartnerKey() {
    return partnerKey;
  }

  public void setPartnerKey(String partnerKey) {
    this.partnerKey = partnerKey;
  }

  public String getMerchantId() {
    return merchantId;
  }

  public void setMerchantId(String merchantId) {
    this.merchantId = merchantId;
  }

  public boolean isSandbox() {
    return sandbox;
  }

  public void setSandbox(boolean sandbox) {
    this.sandbox = sandbox;
  }

  public boolean isConfigured() {
    return !partnerKey.isBlank() && !merchantId.isBlank();
  }

  public String payByPrimeUrl() {
    String host = sandbox ? "sandbox.tappaysdk.com" : "prod.tappaysdk.com";
    return "https://" + host + "/tpc/payment/pay-by-prime";
  }
}
