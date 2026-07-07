import React, { useEffect, useState } from "react";
import User from "./User";
import Message from "./Message";

import { useDispatch, useSelector } from "react-redux";
import { getUserProfileThunk } from "../../store/slice/user/user.thunk";
import { getMessageThunk } from "../../store/slice/message/message.thunk";
import SendMessage from "./SendMessage";

const MessageContainer = () => {
  // const [loggedInUser, setLoggedInUser] = useState({});
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   (async () => {
  //     const response = await dispatch(getUserProfileThunk());
  //     const currentUser = response.payload.responseData.profile;
  //     setLoggedInUser(currentUser);
  //   })();
  // }, []);

  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const { messages } = useSelector((state) => state.messageReducer);

  useEffect(() => {
    (async () => {
      if (selectedUser?._id) {
        await dispatch(getMessageThunk({ receiverId: selectedUser?._id }));
      }
    })();
  }, [selectedUser]);

  return (
    <>
      {!selectedUser ? (
        <div className="w-full flex flex-col items-center justify-center gap-10 p-8 text-center">
          <h1 className="text-green-500/70 text-5xl font-extrabold">
            Welcome to ChatApp
          </h1>
          <p className="text-4xl font-bold text-white/50">
            Please select a person to continue your chat!!
          </p>
        </div>
      ) : (
        <div className="h-screen w-full flex flex-col bg-[url('/image.jpg')] bg-contain bg-center ">
          <div className="w-full p-2 bg-base-300 border-b border-b-white/20">
            <User user={selectedUser} />
          </div>

          <div className="h-full px-2 overflow-y-auto scrollbar-thin">
            {messages?.map((messageDetails) => {
              return (
                <Message
                  key={messageDetails?._id}
                  messageDetails={messageDetails}
                />
              );
            })}
          </div>

          <SendMessage />
        </div>
      )}
    </>
  );
};

export default MessageContainer;
