package com.bmog.server.payment.dto;

public record ChargeResponse(int status, String message, String rawBody) {}
