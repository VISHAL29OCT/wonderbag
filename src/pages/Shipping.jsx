import React from "react";
import "../App.css";

const Shipping = () => {
  return (
    <div className="policy-container">
      <h1>Shipping & Delivery Policy</h1>

      <section>
        <h2>1. Shipping Charges</h2>
        <p>
          We offer simple and transparent shipping charges:
        </p>
        <ul>
          <li><strong>Free Shipping</strong> on orders above ₹700</li>
          <li><strong>₹55 shipping charge</strong> on orders below ₹700</li>
        </ul>
      </section>

      <section>
        <h2>2. Delivery Time</h2>
        <p>
          Orders are usually delivered within <strong>5 - 7 business days</strong>.
          Delivery time may vary depending on your location and availability of products.
        </p>
      </section>

      <section>
        <h2>3. Order Processing</h2>
        <p>
          Orders are processed within 24 - 48 hours after successful payment confirmation.
        </p>
      </section>

      <section>
        <h2>4. Tracking Orders</h2>
        <p>
          Once your order is shipped, you will receive a tracking ID via email or SMS.
        </p>
      </section>

      <section>
        <h2>5. Delivery Issues</h2>
        <p>
          If your order is delayed or not delivered, please contact our support team.
        </p>
      </section>

      <section>
        <h2>6. Contact Us</h2>
        <p>
          For any shipping-related queries:
          <br />
          Email: support@yourstore.com
        </p>
      </section>
    </div>
  );
};

export default Shipping;