import React from "react";
import "./DeliveryTracker.css";

const steps = [
  "Order Placed",
  "Packing in Progress",
  "Product Shipped",
  "Near to You",
  "Out for Delivery",
  "Delivered"
];

const DeliveryTracker = ({ currentStatus }) => {
  const currentIndex = steps.indexOf(currentStatus);

  return (
    <div className="delivery-tracker">
      {steps.map((step, index) => (
        <div key={index} className="step-container">
          <div
            className={`step-circle ${
              index <= currentIndex ? "completed" : ""
            }`}
          >
            {index + 1}
          </div>
          <div className={`step-label ${index <= currentIndex ? "completed" : ""}`}>
            {step}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`step-line ${index < currentIndex ? "completed" : ""}`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DeliveryTracker;
