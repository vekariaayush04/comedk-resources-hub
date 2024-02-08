import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export const Login = () => {
  const BASE_URL = "http://localhost:3000/api/v1/user";

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/signin`, {
        email: email,
        password: password
      });
      const token = response.data.token;
      console.log("Token:", token);
    } catch (error) {
      console.error("Error:", error.response.data);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 to-indigo-600">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
        <h2 className="text-3xl font-semibold text-center mb-6">LOGIN</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-300"
        >
          Login
        </button>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};
