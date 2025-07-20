import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import SingleUser from "../components/SingleUser";

const MyGroupsList = () => {
  return (
    <div className="userlist-box friend-requestlist-box">
      <div className="userlist-input-box">
        <IoSearch className="search" />
        <input placeholder="Search" type="text" />
        <BsThreeDotsVertical className="three-dot" />
      </div>

      <div className="userlist-profile-box">
        <div className="title-box">
          <h4>My Groups</h4>
          <BsThreeDotsVertical className="three-dot" />
        </div>
        <div className="user-details">
          <SingleUser />
          <SingleUser />
          <SingleUser />
          <SingleUser />
          <SingleUser />
          <SingleUser />
          <SingleUser />
          <SingleUser />
          <SingleUser />
        </div>
      </div>
    </div>
  );
};

export default MyGroupsList;
