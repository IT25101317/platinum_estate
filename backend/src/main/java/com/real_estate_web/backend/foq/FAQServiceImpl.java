package com.real_estate_web.backend.foq;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class FAQServiceImpl implements FAQService {

    private final FAQRepository faqRepository;

    @Autowired
    public FAQServiceImpl(FAQRepository faqRepository) {
        this.faqRepository = faqRepository;
    }

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

    private FAQ mapToEntity(FAQDTO dto) {
        FAQ faq = new FAQ();
        faq.setQuestion(dto.getQuestion().trim());
        faq.setAnswer(dto.getAnswer().trim());
        faq.setCategory(dto.getCategory() != null ? dto.getCategory() : "General");
        faq.setIsActive(dto.getIsActive() != null ? dto.getIsActive() : true);
        faq.setDisplayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0);
        return faq;
    }

    @Override
    public FAQDTO createFAQ(FAQDTO faqDTO) {
        FAQ faq = mapToEntity(faqDTO);
        return mapToDTO(faqRepository.save(faq));
    }

    @Override
    @Transactional(readOnly = true)
    public List<FAQDTO> getAllFAQs() {
        List<FAQ> faqs = faqRepository.findAll();
        List<FAQDTO> result = new ArrayList<>();
        for (FAQ faq : faqs) result.add(mapToDTO(faq));
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<FAQDTO> getActiveFAQs() {
        List<FAQ> faqs = faqRepository.findByIsActiveTrueOrderByDisplayOrderAsc();
        List<FAQDTO> result = new ArrayList<>();
        for (FAQ faq : faqs) result.add(mapToDTO(faq));
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<FAQDTO> getFAQsByCategory(String category) {
        List<FAQ> faqs = faqRepository.findByIsActiveTrueAndCategoryOrderByDisplayOrderAsc(category);
        List<FAQDTO> result = new ArrayList<>();
        for (FAQ faq : faqs) result.add(mapToDTO(faq));
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<FAQDTO> searchFAQs(String keyword) {
        List<FAQ> faqs = faqRepository.searchByKeyword(keyword);
        List<FAQDTO> result = new ArrayList<>();
        for (FAQ faq : faqs) result.add(mapToDTO(faq));
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<String> getAllCategories() {
        return faqRepository.findAllActiveCategories();
    }

    @Override
    @Transactional(readOnly = true)
    public FAQDTO getFAQById(Long id) {
        FAQ faq = faqRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("FAQ not found with id: " + id));
        return mapToDTO(faq);
    }

    @Override
    public FAQDTO updateFAQ(Long id, FAQDTO faqDTO) {
        FAQ existing = faqRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("FAQ not found with id: " + id));

        existing.setQuestion(faqDTO.getQuestion().trim());
        existing.setAnswer(faqDTO.getAnswer().trim());
        existing.setCategory(faqDTO.getCategory() != null ? faqDTO.getCategory() : existing.getCategory());
        existing.setIsActive(faqDTO.getIsActive() != null ? faqDTO.getIsActive() : existing.getIsActive());
        existing.setDisplayOrder(faqDTO.getDisplayOrder() != null ? faqDTO.getDisplayOrder() : existing.getDisplayOrder());

        return mapToDTO(faqRepository.save(existing));
    }

    @Override
    public FAQDTO toggleFAQStatus(Long id) {
        FAQ faq = faqRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("FAQ not found with id: " + id));
        faq.setIsActive(!faq.getIsActive());
        return mapToDTO(faqRepository.save(faq));
    }

    @Override
    public void deleteFAQ(Long id) {
        if (!faqRepository.existsById(id)) {
            throw new RuntimeException("FAQ not found with id: " + id);
        }
        faqRepository.deleteById(id);
    }
}