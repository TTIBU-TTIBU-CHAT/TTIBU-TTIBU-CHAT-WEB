package io.ssafy.p.k13c103.backend.service;

import io.ssafy.p.k13c103.backend.dto.PostCreateRequest;
import io.ssafy.p.k13c103.backend.dto.PostResponse;
import io.ssafy.p.k13c103.backend.entity.Post;
import io.ssafy.p.k13c103.backend.entity.User;
import io.ssafy.p.k13c103.backend.repository.PostRepository;
import io.ssafy.p.k13c103.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Transactional
    public PostResponse createPost(String username, PostCreateRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다"));

        Post post = Post.builder()
                .user(user)
                .title(request.getTitle())
                .description(request.getDescription())
                .jsonContent(request.getJsonContent())
                .fileSize(request.getFileSize())
                .build();

        Post savedPost = postRepository.save(post);
        return PostResponse.from(savedPost);
    }

    public List<PostResponse> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(PostResponse::from)
                .collect(Collectors.toList());
    }
}
