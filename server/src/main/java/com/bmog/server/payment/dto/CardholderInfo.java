package com.bmog.server.payment.dto;

import jakarta.validation.constraints.NotBlank;

public record CardholderInfo(@NotBlank String phoneNumber, String name, String email) {}
