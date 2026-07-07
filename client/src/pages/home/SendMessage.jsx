import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../../store/slice/message/message.thunk";
const SendMessage = () => {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const { messages } = useSelector((state) => state.messageReducer);

  const handleSendMessage = () => {
    dispatch(
      sendMessageThunk({ receiverId: selectedUser?._id, message: message }),
    );
    setMessage("");
  };

  return (
    <div className="px-5 pb-2 max-w-full flex justify-between items-center gap-2">
      <fieldset className="fieldset w-full">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
          type="text"
          className="input w-full outline-hidden rounded-3xl bg-[#262e38] px-6 "
          placeholder="Type a message..."
        />
      </fieldset>

      <button
        onClick={handleSendMessage}
        
        className="btn btn-square bg-[#262e38]"
      >
        <IoMdSend />
      </button>
    </div>
  );
};

export default SendMessage;
