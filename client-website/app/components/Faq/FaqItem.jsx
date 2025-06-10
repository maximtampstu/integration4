import { useState } from "react";
import arrow from "../../../assets/arrow.svg";
import "./FaqItem.css";

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFaq = () => setIsOpen(prev => !prev);

  return (
    <section className={`faq-item ${isOpen ? "faq-item--open" : ""}`}>
      <div
        className="faq-item__question"
        onClick={toggleFaq}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && toggleFaq()}
      >
        <p className="faq-item__question-text">{question}</p>
        <img
          src={arrow}
          alt=""
          className="faq-item__arrow"
          aria-hidden="true"
        />
      </div>

      {isOpen && (
        <div className="faq-item__answer">
          <p className="faq-item__answer-text">{answer}</p>
        </div>
      )}
    </section>
  );
};

export default FaqItem;
