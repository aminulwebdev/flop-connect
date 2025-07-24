import React, { useEffect, useState } from "react";
import Profile from "../assets/profile.jpg";
import { GoHome } from "react-icons/go";
import { LuMessageCircleMore } from "react-icons/lu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link, Links, useLocation, useNavigate, useParams } from "react-router-dom";

import { getAuth, signOut } from "firebase/auth"; // ============ Firebase import ============
import { useDispatch } from "react-redux"; // ============ Data pathnor jonno disPatch ============
import { userDetails } from "../slices/userInfoSlice"; // ============  disPatch theke data aei slice e jabe ============

const Sidebar = () => {
  const auth = getAuth();

  let dispatch = useDispatch(); //============= Data pathnor jonno aei hook - Dispatch==============
  let navigate = useNavigate(); //============= login page jaoyar - navigate ==============
  // ============ React Router hook - path dhorar jonno ============
  let location = useLocation();
  let [activeValue, setActiveValue] = useState("");

  // =============== useEffect For Active path ===============
  useEffect(() => {
    setActiveValue(location.pathname.replace("/pages/", "")); // ============ path ber korar jonno ""/pages/"" replace korar hoaech ========
  });

  let HandleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(userDetails(null)); // ============ Aei page theke disPatch maddome null data - userDetails e jabe , fole redux null hoae jabe============
        localStorage.removeItem("userinfo"); // ============ localStorage e data remove kora hoaeche logout er fole ============
        navigate("/login");
        console.log("Click hoaecge");
      })
      .catch((error) => {
        // An error happened.
      });
  };

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
        <RiLogoutBoxRLine onClick={HandleLogout} className="page-icon" />
      </div>
    </div>
  );
};

export default Sidebar;
