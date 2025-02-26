"use client";
import React from "react";
import FeedbackForm from "./FeedbackForm"; // Importing the FeedbackForm component

const Contact = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Contact Us</h1>
      <FeedbackForm /> {/* Reusing the FeedbackForm component */}
    </div>
  );
};

export default Contact;
