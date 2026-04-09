import React, { useState } from "react";
import "../App.css";

const faqData = [
  {
    question: "How do I place an order?",
    answer:
      "Select your product, add it to the cart, and proceed to checkout to place your order.",
  },
  {
    question: "How long does delivery take?",
    answer: "Delivery usually takes 3–7 working days.",
  },
  {
    question: "What are the shipping charges?",
    answer:
      "Free shipping on orders above ₹700. A charge of ₹55 applies to orders below ₹700.",
  },
  {
    question: "What payment methods are available?",
    answer:
      "We accept UPI, Debit Card, Credit Card, and Cash on Delivery (COD).",
  },
  {
    question: "Is online payment secure?",
    answer:
      "Yes, all payments are processed through secure payment gateways.",
  },
  {
    question: "Can I return a product?",
    answer:
      "Yes, you can request a return within 7 days of delivery.",
  },
  {
    question: "When will I receive my refund?",
    answer:
      "Refunds are processed within 5–7 working days after approval.",
  },
  {
    question: "Do I need an account to place an order?",
    answer:
      "An account is not mandatory, but it is recommended for a better experience.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach us through email or the contact form on our website.",
  },
];

function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>

      {faqData.map((item, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question" onClick={() => toggleFAQ(index)}>
            {item.question}
            <span>{activeIndex === index ? "-" : "+"}</span>
          </div>

          {activeIndex === index && (
            <div className="faq-answer">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Faq