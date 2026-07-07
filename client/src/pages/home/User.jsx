import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../store/slice/user/user.slice";

const User = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const { onlineUsers } = useSelector((state) => state.socketReducer);
  const isUserOnline = onlineUsers?.includes(user?._id); // finding  user?._id exists in onlineUsers or not

  const handleUserClick = () => {
    dispatch(setSelectedUser(user));
  };

  return (
    <div
      onClick={handleUserClick}
      className={`flex py-1 px-1 gap-2  rounded ${selectedUser?._id === user?._id ? "bg-base-100" : ""}`}
    >
      <div className={`avatar  w-[3rem] ${isUserOnline && "avatar-online"} `}>
        <div className="w-24 rounded-full">
          <img src={user?.avatar} />
        </div>
      </div>

      <div className="flex flex-col text-sm">
        <h1 className="font-bold line-clamp-1 text-white/85">
          {user?.fullName}
        </h1>
        <p className="text-sm text-white/60">{user?.username}</p>
      </div>
    </div>
  );
};

export default User;
