package tn.esprit.microservice.cours.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${file.upload.images}")
    private String imagePath;

    @Value("${file.upload.videos}")
    private String videoPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:" + imagePath);

        registry.addResourceHandler("/videos/**")
                .addResourceLocations("file:" + videoPath);
    }
}