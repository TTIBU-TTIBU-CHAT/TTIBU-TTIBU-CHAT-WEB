package io.ssafy.p.k13c103.backend.controller;

import io.ssafy.p.k13c103.backend.dto.AuthResponse;
import io.ssafy.p.k13c103.backend.dto.LoginRequest;
import io.ssafy.p.k13c103.backend.dto.SignupRequest;
import io.ssafy.p.k13c103.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@Valid @RequestBody SignupRequest request) {
        try {
            AuthResponse response = authService.signup(request);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            // 잘못된 인증 정보 (아이디 또는 비밀번호 오류)
            return ResponseEntity.status(401).build();
        } catch (AuthenticationException e) {
            // 기타 인증 실패 (계정 잠김, 비활성화 등)
            return ResponseEntity.status(401).build();
        } catch (Exception e) {
            // 기타 서버 오류
            return ResponseEntity.status(500).build();
        }
    }
}
