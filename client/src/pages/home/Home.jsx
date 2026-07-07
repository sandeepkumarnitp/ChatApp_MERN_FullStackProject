import React, { useEffect } from "react";
import UserSidebar from "./UserSidebar";
import MessageContainer from "./MessageContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeSocket,
  setOnlineUsers,
} from "../../store/slice/socket/socket.slice";
import { setNewMessage } from "../../store/slice/message/message.slice";

const Home = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, userProfile, screenLoading } = useSelector(
    (state) => state.userReducer,
  );
  const { socket } = useSelector((state) => state.socketReducer);
  const { messages } = useSelector((state) => state.messageReducer);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(initializeSocket(userProfile?._id));
    }
  }, [isAuthenticated]);

  // setOnlineUsers
  useEffect(() => {
    if (!socket) return;

    socket.on("onlineUsers", (onlineUsers) => {
      // setOnlineUsers
      dispatch(setOnlineUsers(onlineUsers));
    });

    socket.on("newMessage", (newMessage) => {
      dispatch(setNewMessage(newMessage));
    });

    return () => {
      // logout hone ke baad chlega
      socket.close();
    };
  }, [socket]);

  return (
    <div className="flex flex-col sm:flex-row">
      <UserSidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
