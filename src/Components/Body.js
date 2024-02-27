import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../Utils/userSlice";
import DefaultLayout from "./DefaultLayout";
const Body = () => {
  const dispatch = useDispatch();
  const users = localStorage.getItem("user");
  // console.log(users);
  dispatch(setUser(JSON.parse(users)));
  return (
    <DefaultLayout>
      <div>
        <button
          onClick={() => {
            localStorage.removeItem("acessToken");
            window.location.href = "/login";
          }}
        >
          Sign OUT
        </button>
      </div>
    </DefaultLayout>
  );
};

export default Body;
