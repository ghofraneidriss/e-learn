package tn.esprit.microservice.cours;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class AIChatService {

    @Value("${groq.api.key}")
    private String apiKey;

    public String askAI(String courseContent, String message) {

        try {
            HttpClient client = HttpClient.newHttpClient();

            String prompt = """
            You are a course assistant.

            COURSE CONTENT:
            %s

            RULES:
            - If user asks for summary → summarize the course
            - If user asks question → answer only from course
            - If not in course → say "not covered in course"

            USER QUESTION:
            %s
            """.formatted(courseContent, message);

            String body = """
            {
              "model": "llama-3.3-70b-versatile",
              "messages": [
                {
                  "role": "user",
                  "content": "%s"
                }
              ]
            }
            """.formatted(prompt.replace("\"", "'"));

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.groq.com/openai/v1/chat/completions"))
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(body))
                    .build();

            HttpResponse<String> response =
                    client.send(request, HttpResponse.BodyHandlers.ofString());

            return response.body();

        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}
