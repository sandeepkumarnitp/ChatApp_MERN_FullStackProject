import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoKey } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { BiMaleFemale } from "react-icons/bi";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { registerUserThunk } from "../../store/slice/user/user.thunk";
import toast from "react-hot-toast";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isAuthenticated} = useSelector(state => state.userReducer);

  const [signupData, setSignupData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });

  useEffect(()=>{
    if(isAuthenticated) navigate("/");
  },[isAuthenticated])

  const signupHandler = (el) => {
    setSignupData((prev) => ({
      ...prev,
      [el.target.name]: el.target.value,
    }));
  };

  const signupClicked = async () => {
    if(signupData.password !== signupData.confirmPassword){
      toast.error("Password and confirmPassword do not matched")
    }
    else{
      const response = await dispatch(registerUserThunk(signupData));
      console.log(response)
      if(response?.payload?.success){
        navigate("/");
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <fieldset className="fieldset bg-base-300 border-base-400 rounded-box w-xs border p-4 ">
        <legend className="fieldset-legend text-green-500 text-lg">
          Signup
        </legend>

        <label className="input gap-0 outline-hidden mb-2">
          <MdOutlineDriveFileRenameOutline />
          <input
            onChange={signupHandler}
            name="fullName"
            type="text"
            autoComplete="off"
            className="input "
            placeholder="Full Name"
          />
        </label>

        <label className="input gap-0 outline-hidden mb-2">
          <FaUser />
          <input
            onChange={signupHandler}
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
            onChange={signupHandler}
            name="password"
            type="password"
            autoComplete="off"
            className="input "
            placeholder="Password"
          />
        </label>

        <label className="input gap-0 outline-hidden mb-2">
          <IoKey />
          <input
            onChange={signupHandler}
            name="confirmPassword"
            type="password"
            autoComplete="off"
            className="input "
            placeholder="Confirm Password"
          />
        </label>

        <label className="text-sm flex items-center bg-base-100  rounded px-3 py-2 border border-slate-400/20 gap-2">
          <BiMaleFemale />
          <p>Select Your Gender</p>
          <select
            onChange={signupHandler}
            name="gender"
            className="p-1 bg-base-100 outline-hidden border rounded"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <button
          onClick={signupClicked}
          className="btn btn-neutral bg-green-500 mt-2"
        >
          Signup
        </button>
        <p className="mt-2 text-slate-200 text-xsm ">
          Already have an account?{" "}
          <Link to={"/login"} className="text-green-500 underline">
            login
          </Link>
        </p>
        
      </fieldset>
    </div>
  );
};

export default Signup;
