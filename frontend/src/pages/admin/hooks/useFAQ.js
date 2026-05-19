// src/hooks/useFAQ.js
import { useState, useEffect, useCallback } from "react";
import {
  getActiveFAQs,
  getAllFAQs,
  getCategories,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  toggleFAQStatus,
  searchFAQs,
  getFAQsByCategory,
} from "../services/faqService";

// ─── Public Hook (user FAQ page) ─────────────────────────────────────
export const usePublicFAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFAQs = useCallback(async () => {
    try {
      setLoading(true);
      const [faqData, catData] = await Promise.all([getActiveFAQs(), getCategories()]);
      setFaqs(faqData);
      setCategories(catData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchFAQs(); }, [fetchFAQs]);

  const filterByCategory = async (category) => {
    try {
      setLoading(true);
      const data = category === "All"
        ? await getActiveFAQs()
        : await getFAQsByCategory(category);
      setFaqs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const search = async (keyword) => {
    try {
      setLoading(true);
      const data = keyword.trim()
        ? await searchFAQs(keyword)
        : await getActiveFAQs();
      setFaqs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { faqs, categories, loading, error, filterByCategory, search, refetch: fetchFAQs };
};

// ─── Admin Hook (admin dashboard) ────────────────────────────────────
export const useAdminFAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const flash = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllFAQs();
      setFaqs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const create = async (faqData) => {
    const created = await createFAQ(faqData);
    setFaqs((prev) => [created, ...prev]);
    flash("FAQ created successfully!");
    return created;
  };

  const update = async (id, faqData) => {
    const updated = await updateFAQ(id, faqData);
    setFaqs((prev) => prev.map((f) => (f.id === id ? updated : f)));
    flash("FAQ updated successfully!");
    return updated;
  };

  const remove = async (id) => {
    await deleteFAQ(id);
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    flash("FAQ deleted.");
  };

  const toggle = async (id) => {
    const updated = await toggleFAQStatus(id);
    setFaqs((prev) => prev.map((f) => (f.id === id ? updated : f)));
  };

  return { faqs, loading, error, successMsg, create, update, remove, toggle, refetch: fetchAll };
};
