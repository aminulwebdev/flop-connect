import React from "react";
import Profile from "../assets/profile.jpg";
import { GoHome } from "react-icons/go";
import { LuMessageCircleMore } from "react-icons/lu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link, Links } from "react-router-dom";

const Sidebar = () => {
  return (
    // ============= Profile Pic Here =============
    <div className="sidebar-layout">
      <div className="profile-layout">
        <img src={Profile} alt="Profile Image" />
      </div>

      {/* ============= Icon Here ============= */}
      <div className="page-layout">
        <Link to="/pages/home" className="active">
          <GoHome className="page-icon" />
        </Link>
        <Link to="/pages/message">
          <LuMessageCircleMore className="page-icon" />
        </Link>
        <Link to="/pages/notification">
          <IoMdNotificationsOutline className="page-icon" />
        </Link>
        <Link to="/pages/setting">
          <IoSettingsOutline className="page-icon" />
        </Link>
      </div>

      {/* ============= LogOut Here ============= */}
      <div className="logout-layout">
        <RiLogoutBoxRLine className="page-icon" />
      </div>
    </div>
  );
};

export default Sidebar;
