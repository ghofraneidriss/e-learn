package tn.esprit.microservice.cours;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Cours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String cover;
    private String video;
    private String category;
    private String language;
    @Enumerated(EnumType.STRING)
    private Level level;
    private Double price;
    private String duration;
    private String instructor;
    private Date created_at;
    private Date updated_at;
    @Enumerated(EnumType.STRING)
    private Status status;

    public Cours() {
    }

    public Cours(String title, String description, String cover,
            String video, String category, String language, Level level,
            Double price, String duration, String instructor, Date created_at,
            Date updated_at, Status status) {
        this.title = title;
        this.description = description;
        this.cover = cover;
        this.video = video;
        this.category = category;
        this.language = language;
        this.level = level;
        this.price = price;
        this.duration = duration;
        this.instructor = instructor;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Level getLevel() {
        return level;
    }

    public void setLevel(Level level) {
        this.level = level;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getInstructor() {
        return instructor;
    }

    public void setInstructor(String instructor) {
        this.instructor = instructor;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public Date getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(Date updated_at) {
        this.updated_at = updated_at;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
