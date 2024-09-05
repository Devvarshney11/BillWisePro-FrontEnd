import React from "react";
import { useRef, useState } from "react";
import axios from "axios";
import { notify } from "../Utils/Toast";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const phoneNumber = useRef(null);
  const OTP = useRef(null);
  const name = useRef(null);
  const email = useRef(null);
  const GSTIN = useRef(null);
  const company = useRef(null);
  const address = useRef(null);
  const [isLogged, setIsLogged] = useState(true);
  const [isShowOTP, setIsShowOTP] = useState(false);
  const [userData, setUserData] = useState(null);
  const handleFromSubmit = async () => {
    if (isLogged) {
      if (phoneNumber.current.value.length === 0) {
        notify("Please Enter Phone Number", "error");
      } else {
        const data = {
          Phone_Number: phoneNumber.current.value,
        };
        try {
          const response = await axios.post("http://localhost:5000/user", data);
          if (response.status == 200 && response.data.accessToken) {
            setIsShowOTP(true);
            setUserData(response.data);
          }
        } catch (e) {
          notify("Your Phone Number is wrong", "error");
        }
      }
    } else {
      const data = {
        Name: name.current.value,
        GSTIN: GSTIN.current.value,
        Phone_Number: phoneNumber.current.value,
        Company_Name: company.current.value,
        Email_id: email.current.value,
        Address: address.current.value,
      };
      try {
        const response = await axios.post(
          "http://localhost:5000/addUser",
          data
        );
        name.current.value = "";
        GSTIN.current.value = "";
        phoneNumber.current.value = "";
        company.current.value = "";
        email.current.value = "";
        address.current.value = "";
        setIsLogged(true);
        notify("Account Created Successfully", "success");
      } catch (e) {
        notify(e.response.data.message, "error");
      }
    }
  };
  const handleOTPVerification = () => {
    if (OTP.current.value === "9999") {
      notify("You login to your account successfully", "success");
      localStorage.setItem("acessToken", userData.accessToken);
      localStorage.setItem("user", JSON.stringify(userData.users));
      setIsShowOTP(false);
      phoneNumber.current.value = "";
      setTimeout(() => {
        window.location.href = "/";
      }, 300);
    } else {
      notify("Wrong OTP", "error");
    }
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row h-screen items-center">
        <div className="hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen bg-orange-500">
          <img
            src="https://media.licdn.com/dms/image/D4D12AQHRwAbYljPfZQ/article-cover_image-shrink_720_1280/0/1665054129407?e=2147483647&v=beta&t=83ratlBXGF7C0esel1peZlEwTsOlq-3OQW3TRjoiX2o"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
          flex items-center justify-center bg-white shadow-2xl"
        >
          <ToastContainer />
          <div className="w-full h-100 text-center">
            <div>
              <img
                src="https://i.ibb.co/xC7WtG7/Bill-Wise-Pro-Custom-Blue.png"
                className="w-50 mx-auto" // Adjust size as needed
              />
            </div>
            <h1 className="text-4xl md:text-5xl leading-tight mt-2 font-serif">
              {isLogged ? "Log IN" : "Sign UP"}
            </h1>
            <form
              className="mt-6"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {isLogged ? (
                <>
                  <div>
                    <input
                      type="tel"
                      ref={phoneNumber}
                      placeholder="Enter Phone Number"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      autoFocus
                      autoComplete="true"
                    />
                  </div>
                  {isShowOTP ? (
                    <div>
                      <input
                        type="text"
                        ref={OTP}
                        placeholder="Enter OTP"
                        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-3 border focus:border-blue-500 focus:bg-white focus:outline-none"
                        autoFocus
                        autoComplete="true"
                        required
                      />
                      <button
                        type="submit"
                        className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
                        onClick={() => {
                          handleOTPVerification();
                        }}
                      >
                        Verify OTP
                      </button>
                    </div>
                  ) : null}
                </>
              ) : (
                <>
                  <div>
                    <input
                      type="text"
                      ref={name}
                      placeholder="Enter Full Name"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-3 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      autoFocus
                      autoComplete="true"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      ref={company}
                      placeholder="Enter Company Name"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-3 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      autoFocus
                      autoComplete="true"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      ref={address}
                      placeholder="Enter Full Address"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-3 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      autoFocus
                      autoComplete="true"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      ref={GSTIN}
                      placeholder="Enter GST Number"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-3 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      autoFocus
                      autoComplete="true"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      ref={email}
                      placeholder="Enter Email Address"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-3 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      autoFocus
                      autoComplete="true"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      ref={phoneNumber}
                      placeholder="Enter Phone Number"
                      className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-3 border focus:border-blue-500 focus:bg-white focus:outline-none"
                      autoFocus
                      autoComplete="true"
                      required
                    />
                  </div>
                </>
              )}
              {isShowOTP ? null : (
                <button
                  type="submit"
                  className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                  px-4 py-3 mt-6"
                  onClick={() => {
                    handleFromSubmit();
                  }}
                >
                  {isLogged ? "Log IN" : "Sign UP"}
                </button>
              )}
            </form>
            <p className="mt-8">
              {isLogged ? "New To Site ? " : "Already Have Account ? "}
              <span
                onClick={() => {
                  setIsLogged(!isLogged);
                }}
                className="cursor-pointer text-blue-500 hover:text-blue-400 ml-2"
              >
                {isLogged ? "Create Account" : "Log IN"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
