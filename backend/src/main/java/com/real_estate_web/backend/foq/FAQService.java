package real_estate_web.service;

import real_estate_web.dto.FAQDTO;
import java.util.List;

public interface FAQService {

    // CREATE
    FAQDTO createFAQ(FAQDTO faqDTO);

    // READ
    List<FAQDTO> getAllFAQs();                          // Admin: all FAQs
    List<FAQDTO> getActiveFAQs();                       // Public: active only
    List<FAQDTO> getFAQsByCategory(String category);    // Public: by category
    List<FAQDTO> searchFAQs(String keyword);            // Public: search
    List<String> getAllCategories();                     // Public: categories list
    FAQDTO getFAQById(Long id);                         // Admin: single FAQ

    // UPDATE
    FAQDTO updateFAQ(Long id, FAQDTO faqDTO);
    FAQDTO toggleFAQStatus(Long id);                    // Admin: activate/deactivate

    // DELETE
    void deleteFAQ(Long id);
}
