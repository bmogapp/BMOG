package com.bmog.server.payment.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ChargeRequest(
    @NotBlank String prime,
    @NotNull @Positive Integer amount,
    @NotBlank String currency,
    @NotBlank String details,
    @Valid @NotNull CardholderInfo cardholder) {}
