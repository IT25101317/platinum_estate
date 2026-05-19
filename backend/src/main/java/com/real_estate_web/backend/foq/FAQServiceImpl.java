package real_estate_web.service;

import real_estate_web.dto.FAQDTO;
import real_estate_web.exception.FAQExceptionHandler;
import real_estate_web.model.FAQ;
import real_estate_web.repository.FAQRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class FAQServiceImpl implements FAQService {

    private final FAQRepository faqRepository;

    @Autowired
    public FAQServiceImpl(FAQRepository faqRepository) {
        this.faqRepository = faqRepository;
    }

    // ─── Mapper: Entity → DTO ────────────────────────────────────────
    private FAQDTO mapToDTO(FAQ faq) {
        return new FAQDTO(
            faq.getId(),
            faq.getQuestion(),
            faq.getAnswer(),
            faq.getCategory(),
            faq.getIsActive(),
            faq.getDisplayOrder(),
            faq.getCreatedAt() != null ? faq.getCreatedAt().toString() : null,
            faq.getUpdatedAt() != null ? faq.getUpdatedAt().toString() : null
        );
    }

    // ─── Mapper: DTO → Entity ────────────────────────────────────────
    private FAQ mapToEntity(FAQDTO dto) {
        FAQ faq = new FAQ();
        faq.setQuestion(dto.getQuestion().trim());
        faq.setAnswer(dto.getAnswer().trim());
        faq.setCategory(dto.getCategory() != null ? dto.getCategory() : "General");
        faq.setIsActive(dto.getIsActive() != null ? dto.getIsActive() : true);
        faq.setDisplayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0);
        return faq;
    }

    // ─── CREATE ──────────────────────────────────────────────────────
    @Override
    public FAQDTO createFAQ(FAQDTO faqDTO) {
        FAQ faq = mapToEntity(faqDTO);
        FAQ saved = faqRepository.save(faq);
        return mapToDTO(saved);
    }

    // ─── READ: All FAQs (Admin) ───────────────────────────────────────
    @Override
    @Transactional(readOnly = true)
    public List<FAQDTO> getAllFAQs() {
        return faqRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // ─── READ: Active FAQs only (Public) ─────────────────────────────
    @Override
    @Transactional(readOnly = true)
    public List<FAQDTO> getActiveFAQs() {
        return faqRepository.findByIsActiveTrueOrderByDisplayOrderAsc()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // ─── READ: By Category ────────────────────────────────────────────
    @Override
    @Transactional(readOnly = true)
    public List<FAQDTO> getFAQsByCategory(String category) {
        return faqRepository.findByIsActiveTrueAndCategoryOrderByDisplayOrderAsc(category)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // ─── READ: Search ─────────────────────────────────────────────────
    @Override
    @Transactional(readOnly = true)
    public List<FAQDTO> searchFAQs(String keyword) {
        return faqRepository.searchByKeyword(keyword)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // ─── READ: Categories ─────────────────────────────────────────────
    @Override
    @Transactional(readOnly = true)
    public List<String> getAllCategories() {
        return faqRepository.findAllActiveCategories();
    }

    // ─── READ: By ID ──────────────────────────────────────────────────
    @Override
    @Transactional(readOnly = true)
    public FAQDTO getFAQById(Long id) {
        FAQ faq = faqRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("FAQ not found with id: " + id));
        return mapToDTO(faq);
    }

    // ─── UPDATE ───────────────────────────────────────────────────────
    @Override
    public FAQDTO updateFAQ(Long id, FAQDTO faqDTO) {
        FAQ existing = faqRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("FAQ not found with id: " + id));

        existing.setQuestion(faqDTO.getQuestion().trim());
        existing.setAnswer(faqDTO.getAnswer().trim());
        existing.setCategory(faqDTO.getCategory() != null ? faqDTO.getCategory() : existing.getCategory());
        existing.setIsActive(faqDTO.getIsActive() != null ? faqDTO.getIsActive() : existing.getIsActive());
        existing.setDisplayOrder(faqDTO.getDisplayOrder() != null ? faqDTO.getDisplayOrder() : existing.getDisplayOrder());

        FAQ updated = faqRepository.save(existing);
        return mapToDTO(updated);
    }

    // ─── UPDATE: Toggle Active Status ─────────────────────────────────
    @Override
    public FAQDTO toggleFAQStatus(Long id) {
        FAQ faq = faqRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("FAQ not found with id: " + id));
        faq.setIsActive(!faq.getIsActive());
        return mapToDTO(faqRepository.save(faq));
    }

    // ─── DELETE ───────────────────────────────────────────────────────
    @Override
    public void deleteFAQ(Long id) {
        if (!faqRepository.existsById(id)) {
            throw new RuntimeException("FAQ not found with id: " + id);
        }
        faqRepository.deleteById(id);
    }
}
