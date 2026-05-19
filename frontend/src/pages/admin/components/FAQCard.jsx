// src/components/faq/FAQCard.jsx
import { useState } from "react";

const FAQCard = ({ faq }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-200 ${
        open ? "border-blue-300 shadow-sm" : "border-gray-200"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition"
      >
        <span className="text-gray-800 font-medium text-sm pr-4">{faq.question}</span>
        <span
          className={`text-blue-500 text-xl flex-shrink-0 transform transition-transform duration-200 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      {open && (
        <div className="px-5 pb-5 pt-1 bg-white border-t border-gray-100">
          <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQCard;
