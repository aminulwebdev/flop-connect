import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";

const UserList = () => {
  return (
    <div className="userlist-box">
      <div className="userlist-input-box">
        <IoSearch className="search" />
        <input placeholder="Search"  type="text"  />
        <BsThreeDotsVertical className="three-dot" />
      </div>

      <div></div>
    </div>
  );
};

export default UserList;
