package io.ssafy.p.k13c103.backend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "*")
public class TestController {

    @PostMapping("/hodu")
    public HoduResponse addHodu(@RequestBody HoduRequest request) {
        String result = request.getText() + "hodu";
        return new HoduResponse(result);
    }

    public static class HoduRequest {
        private String text;

        public HoduRequest() {}

        public HoduRequest(String text) {
            this.text = text;
        }

        public String getText() {
            return text;
        }

        public void setText(String text) {
            this.text = text;
        }
    }

    public static class HoduResponse {
        private String result;

        public HoduResponse() {}

        public HoduResponse(String result) {
            this.result = result;
        }

        public String getResult() {
            return result;
        }

        public void setResult(String result) {
            this.result = result;
        }
    }
}
