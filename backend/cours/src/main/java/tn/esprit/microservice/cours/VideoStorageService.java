package tn.esprit.microservice.cours;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class VideoStorageService {

    @Value("${file.upload.videos}")
    private String uploadDir;

    public String save(MultipartFile file) throws IOException {

        //  Vérification type fichier
        if (file.getContentType() == null || !file.getContentType().startsWith("video/")) {
            throw new RuntimeException("Invalid file type");
        }

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        Path path = Paths.get(uploadDir);
        Files.createDirectories(path);

        Files.copy(file.getInputStream(), path.resolve(fileName));

        return fileName;
    }
}
