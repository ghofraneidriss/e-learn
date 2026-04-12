package tn.esprit.microservice.cours;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class ImageStorageService {

    @Value("${file.upload.images}")
    private String uploadDir;

    public String save(MultipartFile file) throws IOException {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        Path path = Paths.get(uploadDir);
        Files.createDirectories(path);

        Files.copy(file.getInputStream(), path.resolve(fileName));

        return fileName;
    }
}
