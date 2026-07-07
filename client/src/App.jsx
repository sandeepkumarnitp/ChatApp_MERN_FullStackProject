import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOtherUserProfileThunk, getUserProfileThunk, loginUserThunk } from "./store/slice/user/user.thunk";
import {Toaster} from "react-hot-toast";


const App = () => {
  // const { isAuthenticated } = useSelector((state) => state.userReducer);
  // const dispatch = useDispatch(); // react toolkit ke function ko call karne ke liye useDispatch state ka use karte hai
  // console.log(isAuthenticated);

  // useEffect(() => {
  //   dispatch(loginUserThunk());
  // });

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(()=>{
    (async()=>{
      const response = await dispatch(getUserProfileThunk())
      // console.log(response.payload.responseData.profile)
    })()
  },[])

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
