import React, { use, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import {
  getOtherUserProfileThunk,
  getUserProfileThunk,
  logoutUserThunk,
} from "../../store/slice/user/user.thunk.js";

const UserSidebar = () => {
  const [searchedUser, setSearchedUser] = useState("");
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();
  const { isAuthenticated, userProfile, otherUsersProfile, screenLoading } =
    useSelector((state) => state.userReducer);

  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
  };

  useEffect(() => {
    (async () => {
      const response = await dispatch(getOtherUserProfileThunk());
    })();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!searchedUser) {
      setUsers(otherUsersProfile);
    } else {
      setUsers(
        otherUsersProfile?.filter((el) => {
          return (
            el.fullName.toLowerCase().includes(searchedUser.toLowerCase()) ||
            el.username.toLowerCase().includes(searchedUser.toLowerCase())
          );
        }),
      );
    }
  }, [searchedUser, screenLoading, otherUsersProfile]);

  return (
    <div className="w-full sm:max-w-[35%] lg:max-w-[30%] h-screen bg-base-300 p-3 flex flex-col gap-2 border-r border-r-white/20 ">
      <div>
        <p className="w-[23%] text-2xl font-extrabold text-green-500">
          ChatApp
        </p>
      </div>

      <div className="">
        <label className="input outline-hidden min-w-full">
          <FaSearch />
          <input
            onChange={(e) => setSearchedUser(e.target.value)}
            type="search"
            className="grow"
            placeholder="Search"
          />
        </label>
      </div>

      {/* ******** user section ***********/}
      <div className="h-full overflow-y-auto scrollbar scrollbar-thumb-green-900 scrollbar-thin cursor-pointer ">
        {users?.map((ele, key) => {
          return (
            <div key={key} className="hover:bg-base-100 rounded-md mb-1">
              <User key={ele?._id} user={ele} />
            </div>
          );
        })}
      </div>

      {/* *********footer *************/}
      <div className="h-[3.5rem] cursor-pointer rounded-xl flex items-center justify-between px-2 bg-base-100">
        <div className="flex gap-2 items-center justify-center">
          <div className="avatar w-[3.5rem] p-0.5">
            <div className="w-24 rounded-full">
              <img src={userProfile?.avatar} />
            </div>
          </div>
          <div className="flex flex-col items-start  ">
            <h2 className="text-xl font-bold text-white">
              {userProfile?.fullName}
            </h2>
            <p className="text-sm  text-white/60">{userProfile?.username}</p>
          </div>
        </div>

        <div className="flex items-center  justify-center text-white-600 bg-red-700 py-1 px-2 active:bg-red-800 hover:bg-red-600 rounded ">
          <LuLogOut />
          <button
            onClick={handleLogout}
            className="px-2 py-1  rounded cursor-pointer  font-bold"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
