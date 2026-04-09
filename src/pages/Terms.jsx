import React from "react";
import "../App.css";

const Terms = () => {
  return (
    <div className="terms-container">
      <h1>Terms & Conditions</h1>

      <section>
        <h2>1. Introduction</h2>
        <p>
          Welcome to our website. By accessing and using our platform, you agree
          to comply with these terms and conditions. If you do not agree, please
          do not use our services.
        </p>
      </section>

      <section>
        <h2>2. Products & Pricing</h2>
        <p>
          We sell various types of bags including backpacks, handbags, and travel bags.
          All prices are listed in INR and are subject to change without notice.
        </p>
      </section>

      <section>
        <h2>3. Orders & Payments</h2>
        <p>
          Orders are confirmed only after successful payment. We reserve the right
          to cancel any order due to pricing errors or stock issues.
        </p>
      </section>

      <section>
        <h2>4. Shipping & Delivery</h2>
        <p>
          We aim to deliver products within 5–7 business days. Delivery time may
          vary based on your location.
        </p>
      </section>

      <section>
        <h2>5. Returns & Refunds</h2>
        <p>
          You can request a return within 7 days of delivery. The product must be
          unused and in original condition. Refunds will be processed within 5–10 days.
        </p>
      </section>

      <section>
        <h2>6. User Responsibilities</h2>
        <p>
          Users must provide accurate information while placing orders. Misuse of
          the platform may result in account suspension.
        </p>
      </section>

      <section>
        <h2>7. Privacy Policy</h2>
        <p>
          Your personal data is सुरक्षित (safe) with us. We do not share your
          information with third parties without consent.
        </p>
      </section>

      <section>
        <h2>8. Limitation of Liability</h2>
        <p>
          We are not responsible for any indirect damages or losses arising from
          the use of our website.
        </p>
      </section>

      <section>
        <h2>9. Contact Us</h2>
        <p>
          If you have any questions, contact us at:
          <br />
          Email: support@yourstore.com
        </p>
      </section>
    </div>
  );
};

export default Terms;