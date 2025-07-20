import React, { useEffect, useState } from "react";
import Profile from "../assets/profile.jpg";
import { GoHome } from "react-icons/go";
import { LuMessageCircleMore } from "react-icons/lu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link, Links, useLocation, useParams } from "react-router-dom";

const Sidebar = () => {
  // ============ React Router hook - path dhorar jonno ============
  let location = useLocation();
  let [activeValue, setActiveValue] = useState("");

  // =============== useEffect For Active path ===============
  useEffect(() => {
    setActiveValue(location.pathname.replace("/pages/", "")); // ============ path ber korar jonno ""/pages/"" replace korar hoaech ========
  });

  return (
    // ============= Profile Pic Here =============
    <div className="sidebar-layout">
      <div className="profile-layout">
        <img src={Profile} alt="Profile Image" />
      </div>

      {/* ============= Icon Here ============= */}
      <div className="page-layout">
        <Link to="/pages/home" className={activeValue == "home" && "active"}>
          {/* Short-circuit condition */}
          <GoHome className="page-icon" />
        </Link>
        <Link to="/pages/message" className={activeValue == "message" && "active"}>
          <LuMessageCircleMore className="page-icon" />
        </Link>
        <Link to="/pages/notification" className={activeValue == "notification" && "active"}>
          <IoMdNotificationsOutline className="page-icon" />
        </Link>
        <Link to="/pages/setting" className={activeValue == "setting" && "active"}>
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
