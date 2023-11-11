// pages/privacy-policy.js
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <p className="mb-4">
        Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.
      </p>

      <h2 className="text-xl font-semibold mb-2">1. Personal Information Collection</h2>
      <p className="mb-4">
        We collect user details that are necessary for delivering our products easily.
      </p>

      <h2 className="text-xl font-semibold mb-2">2. Information Collection Methods</h2>
      <p className="mb-4">
        We collect information through Google authentication, and we may ask users to provide their address for delivery purposes.
      </p>

      <h2 className="text-xl font-semibold mb-2">3. Use of Collected Information</h2>
      <p className="mb-4">
        The collected information is used solely for the purpose of delivering our products.
      </p>

      <h2 className="text-xl font-semibold mb-2">4. Information Security</h2>
      <p className="mb-4">
        We ensure the safety of your information through secure authentication measures.
      </p>

      <h2 className="text-xl font-semibold mb-2">5. Information Sharing</h2>
      <p className="mb-4">
        We do not share any user information with third parties.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
