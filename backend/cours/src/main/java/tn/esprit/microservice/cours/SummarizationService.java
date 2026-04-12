package tn.esprit.microservice.cours;

import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class SummarizationService {

    private final String HF_TOKEN = "YOUR_HUGGINGFACE_TOKEN";

    public String summarize(String text) throws Exception {

        HttpClient client = HttpClient.newHttpClient();

        String json = """
        {
          "inputs": "%s"
        }
        """.formatted(text.replace("\"", "'"));

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api-inference.huggingface.co/models/facebook/bart-large-cnn"))
                .header("Authorization", "Bearer " + HF_TOKEN)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .build();

        HttpResponse<String> response =
                client.send(request, HttpResponse.BodyHandlers.ofString());

        return response.body();
    }
}
