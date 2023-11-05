"use client";
import axios from "axios";
import React, { useState } from "react";

const register = async (data) => {
  console.log(data);
  try {
    const response = await axios.post("http://localhost:3001/register", data, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    showPassword: false,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleCheckboxChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      showPassword: !prevData.showPassword,
    }));
  };
  const registerUser = () => {
    const { username, email, password } = formData;

    // Validate Gmail address
    const isGmail = /[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
    if (!isGmail) {
      alert("Please enter a valid Gmail address.");
      return;
    }

    // Perform registration logic (e.g., make an API request)
    let fff = register({ username, email, password });
    setFormData({ username: "", email: "", password: "", showPassword: false });
  };

  return (
    <form
      className="max-w-md mx-auto mt-8"
      onSubmit={(e) => e.preventDefault()}
    >
      <label
        htmlFor="username"
        className="block text-sm font-medium text-gray-700"
      >
        Username (at least 5 characters):
      </label>
      <input
        type="text"
        id="username"
        name="username"
        className="mt-1 p-2 border rounded-md w-full"
        minLength="5"
        required
        onChange={handleChange}
        value={formData.username}
      />

      <label
        htmlFor="email"
        className="block mt-4 text-sm font-medium text-gray-700"
      >
        Email (Gmail only):
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        className="mt-1 p-2 border rounded-md w-full"
        pattern="[a-zA-Z0-9._%+-]+@gmail\.com$"
        required
        onChange={handleChange}
      />
      <small className="text-gray-500">Only Gmail addresses are allowed.</small>

      <label
        htmlFor="password"
        className="block mt-4 text-sm font-medium text-gray-700"
      >
        Password (at least 8 characters):
      </label>
      <input
        type={formData.showPassword ? "text" : "password"}
        id="password"
        name="password"
        className="mt-1 p-2 border rounded-md w-full"
        minLength="8"
        value={formData.password}
        required
        onChange={handleChange}
      />

      <input
        type="checkbox"
        id="showPassword"
        className="mt-2"
        onChange={handleCheckboxChange}
        checked={formData.showPassword}
        value={formData.password}
      />
      <label htmlFor="showPassword" className="ml-2 text-sm text-gray-700">
        Show Password
      </label>

      <button
        type="button"
        className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={registerUser}
      >
        Register
      </button>
    </form>
  );
};

export default SignUp;
