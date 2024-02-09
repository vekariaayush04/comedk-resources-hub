import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useRecoilState } from "recoil";
// import { registerAtom } from "../../store/register.atom";
import axios from 'axios'

export const Register = () => {
  const BASE_URL = "http://localhost:3000/api/v1/user"
  const [formData , setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const addData = ()=> { 
    setFormData({
      username: username,
      email: email,
      password: password
    });
  }

  useEffect(()=>{
      // const fetchData = async()=>{
      //     const response = await axios.post();
      //     const token = response.data.token;
      //     // Do something with the token, such as storing it in local storage
      //     console.log("Token:", token);
      // }
      // fetchData()

      axios.post(`${BASE_URL}/signup`, formData)
      .then((response)=>{
        const token = response.data.token
        console.log(token);
      })
      .catch((error)=>{
        console.log(error.response.data)
      })
  },[formData])



  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-400 to-indigo-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
        <h2 className="text-3xl font-semibold text-center mb-6">REGISTER</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
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
        <div className="mb-4">
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
          onClick={addData}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-300"
        >
          Register
        </button>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};