package com.real_estate_web.backend.foq;

import java.util.List;

public interface FAQService {

    FAQDTO createFAQ(FAQDTO faqDTO);

    List<FAQDTO> getAllFAQs();
    List<FAQDTO> getActiveFAQs();
    List<FAQDTO> getFAQsByCategory(String category);
    List<FAQDTO> searchFAQs(String keyword);
    List<String> getAllCategories();
    FAQDTO getFAQById(Long id);

    FAQDTO updateFAQ(Long id, FAQDTO faqDTO);
    FAQDTO toggleFAQStatus(Long id);

    void deleteFAQ(Long id);
}