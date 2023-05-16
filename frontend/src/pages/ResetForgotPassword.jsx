import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ResetForgotPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/users/resetpassword/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetForgotPassword;
