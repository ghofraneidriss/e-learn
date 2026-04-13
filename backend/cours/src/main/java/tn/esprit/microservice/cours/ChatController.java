package tn.esprit.microservice.cours;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.microservice.cours.dto.ChatRequest;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private AIChatService aiService;

    // temporary course data (replace with DB later)
    private String getCourseContent(Long courseId) {

        if (courseId == 1) {
            return "Spring Boot basics, REST APIs, Controllers, Services, Dependency Injection";
        }

        return "General course content";
    }

    @PostMapping
    public String chat(@RequestBody ChatRequest request) {

        String courseContent = getCourseContent(request.getCourseId());

        return aiService.askAI(courseContent, request.getMessage());
    }
}
