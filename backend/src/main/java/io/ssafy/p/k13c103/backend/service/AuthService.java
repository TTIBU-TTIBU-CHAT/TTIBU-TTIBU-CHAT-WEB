package io.ssafy.p.k13c103.backend.service;

import io.ssafy.p.k13c103.backend.dto.AuthResponse;
import io.ssafy.p.k13c103.backend.dto.LoginRequest;
import io.ssafy.p.k13c103.backend.dto.SignupRequest;
import io.ssafy.p.k13c103.backend.entity.User;
import io.ssafy.p.k13c103.backend.repository.UserRepository;
import io.ssafy.p.k13c103.backend.security.CustomUserDetails;
import io.ssafy.p.k13c103.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthResponse signup(SignupRequest request) {
        // 중복 확인
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }

        // 사용자 생성
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .nickname(request.getNickname())
                .build();

        userRepository.save(user);

        // JWT 토큰 생성
        String token = jwtUtil.generateToken(user.getUsername());

        return AuthResponse.builder()
                .token(token)
                .username(user.getUsername())
                .nickname(user.getNickname())
                .build();
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        // Spring Security의 AuthenticationManager를 통해 인증
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        // 인증된 사용자 정보 가져오기
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        // JWT 토큰 생성
        String token = jwtUtil.generateToken(userDetails.getUsername());

        return AuthResponse.builder()
                .token(token)
                .username(userDetails.getUsername())
                .nickname(userDetails.getNickname())
                .build();
    }
}

