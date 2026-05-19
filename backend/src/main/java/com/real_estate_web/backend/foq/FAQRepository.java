package com.real_estate_web.backend.foq;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FAQRepository extends JpaRepository<FAQ, Long> {

    List<FAQ> findByIsActiveTrueOrderByDisplayOrderAsc();

    List<FAQ> findByIsActiveTrueAndCategoryOrderByDisplayOrderAsc(String category);

    List<FAQ> findByCategoryOrderByDisplayOrderAsc(String category);

    @Query("SELECT f FROM FAQ f WHERE f.isActive = true AND " +
           "(LOWER(f.question) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(f.answer) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<FAQ> searchByKeyword(@Param("keyword") String keyword);

    @Query("SELECT DISTINCT f.category FROM FAQ f WHERE f.isActive = true")
    List<String> findAllActiveCategories();

    boolean existsByQuestionIgnoreCase(String question);
}