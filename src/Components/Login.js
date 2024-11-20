import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useNavigate,
} from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch("/.netlify/functions/getData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      console.log(data);
        Swal.fire({
          title: "Success",
          text: "Logged in Successfully",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        });
    } else {
      console.error(data.error);
      Swal.fire({
        title: "Error",
        text: "You have entered wrong credentials",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });
    }
  };
  return (
    <div className="flex w-full h-screen">
      <div className="hidden relative lg:flex h-full w-1/3 items-center justify-center bg-gray-200">
        <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce transition-all ">
          <div className="py-10 px-12 justify-center items-center align">
            <p className=" text-white text-3xl font-bold">Deveazy</p>
          </div>
        </div>
        <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
      </div>
      <div className="w-full py:5 px-3 lg:px-20 flex items-center justify-center lg:w-2/3">
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200">
          <h1 className="text-5xl font-semibold">Welcome to Deveazy</h1>
          <p className="font-medium text-lg text-gray-500 mt-4">
            Please enter your details to login
          </p>
          <div className="mt-8">
            <div>
              <label className="text-lg font-bold">Username : </label>
              <input
                type=""
                className="w-full border-2 border-gray-50 rounded-xl p-3 mt-1 bg-gray-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Username"
              />
            </div>
            <div>
              <label className="text-lg font-bold">Password : </label>
              <input
                type="password"
                className="w-full border-2 border-gray-50 rounded-xl p-3 mt-1 bg-gray-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="6+ Characters"
                required
              />
            </div>
            <div className="mt-5 justify-between items-center">
              <div>
                <input type="checkbox" id="remember" />
                <label className="ml-2 font-medium text-base" for="remember">
                  Remember Me
                </label>
              </div>
            </div>
            <div className="mt-8 lg:flex gap-3">
              <button className="w-full lg:w-1/2 active:scale-[0.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-pink-500 text-white text-lg font-bold justify-center items-center"
              onClick={handleLogin}>
                Login
              </button>
              <button className="w-full lg:w-1/2 flex border-2 border-gray-100 py-3 rounded-xl items-center justify-center gap-2 active:scale-[0.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z"
                    fill="#34A853"
                  />
                  <path
                    d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z"
                    fill="#4A90E2"
                  />
                  <path
                    d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z"
                    fill="#FBBC05"
                  />
                </svg>
                Sign In with Google
              </button>
            </div>
            <div className="mt-8 flex justify-center items-center">
              <p className="font-medium text-base">Don't have an account?</p>
              <button className="text-pink-500 ml-2 text-base font-medium">
                <Link to="/">Sign Up</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
