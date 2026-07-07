import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileThunk } from "../../store/slice/user/user.thunk";

const Message = ({ messageDetails }) => {
  const { userProfile } = useSelector((state) => state.userReducer);

  const messageRef = useRef(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageRef]);

  const createdTime = new Date(messageDetails.createdAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <div
        ref={messageRef}
        className={`chat text-sm ${userProfile?._id === messageDetails?.senderId ? "chat-end" : "chat-start"}`}
      >
        <div className="chat-bubble">
          {messageDetails.message}
          <span className="text-xs text-[#666] align-sub ml-2">{createdTime}</span>
        </div>
      </div>
    </>
  );
};

export default Message;
