import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOtherUserProfileThunk,
  getUserProfileThunk,
  loginUserThunk,
} from "./store/slice/user/user.thunk";
import { Toaster } from "react-hot-toast";

const App = () => {
  const dispatch = useDispatch();
  const [isAuthenticated] = useSelector(state=>state.userReducer);

  useEffect(() => {
    (async () => {
      const response = await dispatch(getUserProfileThunk());
    })();
  }, [isAuthenticated]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
