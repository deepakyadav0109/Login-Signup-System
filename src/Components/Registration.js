import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useNavigate,
} from "react-router-dom";
import UploadImage from "../Components/UploadImage";
import Swal from "sweetalert2";
import { useState } from "react";

export default function Selection() {
  const [location, setLocation] = useState("");

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const handleNext = async () => {
    fetch("/.netlify/functions/getData", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
        location: location,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.error);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        Swal.fire({
          title: "Success",
          text: "Saved Successfully",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        });
        navigate("/verification");
        localStorage.removeItem('userId');
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Error !",
          text: "There is some Error saving the data",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#FF0000",
        });
      });
  };

  return (
    <div className="bg-transparent">
      <div className="lg:flex w-full h-full">
        <div className="lg:w-1/3">
          <div className="hidden relative lg:flex h-full w-full items-center justify-center bg-gray-200">
            <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce transition-all ">
              <div className="py-20 px-12 justify-center items-center align">
                <p className=" text-white text-3xl font-bold">Deveazy</p>
              </div>
            </div>
            <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
          </div>
        </div>
        <div className="w-full px-3 py-5 lg:px-20 lg:py-20 flex items-center justify-center lg:w-2/3 ">
          <div className="bg-white px-3 py-3 lg:px-10 lg:py-10 rounded-3xl border-2 border-gray-200">
            <div className="justify-center items-center mt-5 ml-5">
              <div className="justify-center items-center">
                <p className="w-full h-1/5 text-4xl font-bold justify-center items-center">
                  Welcome! Let's create your Profile
                </p>
                <p className="font-medium text-lg text-gray-500 mt-4 ">
                  Let others get to know you better! You can do these later
                </p>
              </div>
              <div>
                <div className="text-lg font-bold mt-5">
                  <h2>Add an Avatar</h2>
                </div>
                <div>
                  <UploadImage />
                </div>
              </div>
              <div className="mt-5">
                <label className="text-lg font-bold">Add your location </label>
                <input
                  className="w-full border-2 border-gray-50 rounded-xl p-3 mt-1 bg-gray-100"
                  placeholder="San Francisco"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="justify-center items-center ">
                <div>
                  <button className="w-full lg:w-1/3 active:scale-[0.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-pink-500 text-white text-lg font-bold justify-center items-center mt-3"
                  onClick={handleNext}>
                    Next
                  </button>
                </div>
              </div>
              <div className="mt-2 ml-2 flex">
                <p className="font-medium text-base">or Press RETURN</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
