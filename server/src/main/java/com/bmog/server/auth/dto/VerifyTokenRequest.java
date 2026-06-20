package com.bmog.server.auth.dto;

import jakarta.validation.constraints.NotBlank;

public record VerifyTokenRequest(@NotBlank String idToken) {}
