package io.ssafy.p.k13c103.backend.dto;

import io.ssafy.p.k13c103.backend.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostResponse {

    private Long id;
    private String username;
    private String nickname;
    private String title;
    private String description;
    private String jsonContent;
    private Long fileSize;
    private LocalDateTime createdAt;

    public static PostResponse from(Post post) {
        return PostResponse.builder()
                .id(post.getId())
                .username(post.getUser().getUsername())
                .nickname(post.getUser().getNickname())
                .title(post.getTitle())
                .description(post.getDescription())
                .jsonContent(post.getJsonContent())
                .fileSize(post.getFileSize())
                .createdAt(post.getCreatedAt())
                .build();
    }
}
