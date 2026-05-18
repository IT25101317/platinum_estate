package real_estate_web.repository;

import real_estate_web.model.FAQ;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FAQRepository extends JpaRepository<FAQ, Long> {

    // Get all active FAQs ordered by display_order
    List<FAQ> findByIsActiveTrueOrderByDisplayOrderAsc();

    // Get active FAQs by category
    List<FAQ> findByIsActiveTrueAndCategoryOrderByDisplayOrderAsc(String category);

    // Get all FAQs by category (admin use)
    List<FAQ> findByCategoryOrderByDisplayOrderAsc(String category);

    // Search FAQs by keyword in question or answer
    @Query("SELECT f FROM FAQ f WHERE f.isActive = true AND " +
           "(LOWER(f.question) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(f.answer) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<FAQ> searchByKeyword(@Param("keyword") String keyword);

    // Get all distinct categories
    @Query("SELECT DISTINCT f.category FROM FAQ f WHERE f.isActive = true")
    List<String> findAllActiveCategories();

    // Check if question already exists
    boolean existsByQuestionIgnoreCase(String question);
}
