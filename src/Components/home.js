import React, { useState } from 'react';

export default function Verification() {
  const [email, setEmail] = useState('account@refero.design');

  const handleResend = () => {
    // Code to resend the confirmation email
  };

  const handleChangeEmail = () => {
    // Code to change the email
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Please verify your email address</h2>
        <p className="mb-4">
          We've sent a confirmation email to:
          <span className="block text-blue-600">{email}</span>
        </p>
        <p className="mb-4">
          Click the confirmation link in that email to begin using Dribbble.
        </p>
        <p className="mb-4">
          Didn't receive the email? Check your Spam folder, it may have been caught by a filter. If you still don't see it, you can <button className="text-blue-600 underline" onClick={handleResend}>resend the confirmation email</button>.
        </p>
        <p className="mb-4">
          Wrong email address? <button className="text-blue-600 underline" onClick={handleChangeEmail}>Change it</button>.
        </p>
      </div>
    </div>
  );
}