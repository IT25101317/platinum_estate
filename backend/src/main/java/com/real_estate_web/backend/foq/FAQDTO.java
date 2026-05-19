package real_estate_web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class FAQDTO {

    private Long id;

    @NotBlank(message = "Question is required")
    @Size(max = 500, message = "Question must not exceed 500 characters")
    private String question;

    @NotBlank(message = "Answer is required")
    private String answer;

    private String category = "General";
    private Boolean isActive = true;
    private Integer displayOrder = 0;
    private String createdAt;
    private String updatedAt;

    // Constructors
    public FAQDTO() {}

    public FAQDTO(Long id, String question, String answer, String category,
                  Boolean isActive, Integer displayOrder, String createdAt, String updatedAt) {
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.category = category;
        this.isActive = isActive;
        this.displayOrder = displayOrder;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public String getAnswer() { return answer; }
    public void setAnswer(String answer) { this.answer = answer; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

    public String getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }
}
