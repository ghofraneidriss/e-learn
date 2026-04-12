package tn.esprit.microservice.cours;

import org.springframework.stereotype.Service;

import java.io.File;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class CaptionService {

    private final String API_KEY = "YOUR_DEEPGRAM_API_KEY";

    public String transcribe(File file) throws Exception {

        HttpClient client = HttpClient.newHttpClient();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.deepgram.com/v1/listen?smart_format=true"))
                .header("Authorization", "Token " + API_KEY)
                .header("Content-Type", "audio/mp4") // or audio/wav
                .POST(HttpRequest.BodyPublishers.ofFile(file.toPath()))
                .build();

        HttpResponse<String> response =
                client.send(request, HttpResponse.BodyHandlers.ofString());

        return response.body(); // JSON transcript
    }
}
