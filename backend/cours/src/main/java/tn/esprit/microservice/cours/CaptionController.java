package tn.esprit.microservice.cours;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@RestController
@RequestMapping("/api/caption")
public class CaptionController {

    @Autowired
    private CaptionService service;

    @PostMapping("/transcribe")
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) throws Exception {

        File temp = File.createTempFile("video", file.getOriginalFilename());
        file.transferTo(temp);

        return ResponseEntity.ok(service.transcribe(temp));
    }
}
