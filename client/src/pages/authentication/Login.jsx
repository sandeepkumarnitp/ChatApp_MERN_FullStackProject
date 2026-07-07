import { Password } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoKey } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../../store/slice/user/user.thunk.js";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {isAuthenticated} = useSelector(state => state.userReducer);

  useEffect(()=>{
    if(isAuthenticated) navigate("/");
  },[isAuthenticated])


  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const loginHandler = (el) => {
    // setLoginData({ ...loginData, [el.target.name]: el.target.value });
    setLoginData((prev) => ({
      ...prev,
      [el.target.name]: el.target.value,
    }));
  };

  const loginClicked = async () => {
    const response = await dispatch(loginUserThunk(loginData));
    if(response?.payload?.success){
      navigate("/");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <fieldset className="fieldset bg-base-300 border-base-400 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-green-500 text-lg">
          Login
        </legend>

        <label className="input gap-0 outline-hidden mb-2">
          <FaUser />
          <input
            onChange={loginHandler}
            name="username"
            type="text"
            autoComplete="off"
            className="input  "
            placeholder="Username"
          />
        </label>

        <label className="input gap-0 outline-hidden mb-2">
          <IoKey />
          <input
            onChange={loginHandler}
            name="password"
            type="password"
            autoComplete="off"
            className="input "
            placeholder="Password"
          />
        </label>

        <button
          onClick={loginClicked}
          className="btn btn-neutral bg-green-500 mt-2"
        >
          Login
        </button>
        <p className="mt-2 text-slate-200 text-xsm ">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-green-500 underline">
            signup
          </Link>
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
