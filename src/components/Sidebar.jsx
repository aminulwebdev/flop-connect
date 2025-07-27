import React, { createRef, useEffect, useRef, useState } from "react";
import Profile from "../assets/profile.jpg";
import { GoHome } from "react-icons/go";
import { LuMessageCircleMore } from "react-icons/lu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaCloudUploadAlt } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Link, Links, useLocation, useNavigate, useParams } from "react-router-dom";

import { getAuth, signOut } from "firebase/auth"; // ============ Firebase import ============
import { useDispatch } from "react-redux"; // ============ Data pathnor jonno disPatch ============
import { userDetails } from "../slices/userInfoSlice"; // ============  disPatch theke data aei slice e jabe ============

// ===============================================
//         React Copper import
// ==============================================

// import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Cropper } from "react-cropper";

// =========== Button Customization =============

const MyButton = styled(Button)({
  // width: "100%",
  borderRadius: "9px",
  height: "10px",
  // margin: "60px 0 30px",
  fontSize: "15px",
  fontWeight: "600",
  textTransform: "none",
  padding: "20px",
});

const Sidebar = () => {
  const auth = getAuth();

  let dispatch = useDispatch(); //============= Data pathnor jonno aei hook - Dispatch==============
  let navigate = useNavigate(); //============= login page jaoyar - navigate ==============

  // ============ React Router hook - path dhorar jonno ============
  let location = useLocation();
  let [activeValue, setActiveValue] = useState("");

  let [visibleProfileWindow, setVisibleProfileWindow] = useState(false); // ============ Profile pic update korar windo  ============
  let profileRef = useRef(null);

  // =================== React Copper Sate ===================
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef("");

  // =============== useEffect For Active path ==================
  useEffect(() => {
    setActiveValue(location.pathname.replace("/pages/", "")); // ============ path ber korar jonno ""/pages/"" replace korar hoaech ========
  });

  //  ============= Logout Button Function Here =================

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

  // ==============================================
  //         Profile pic update Function
  // ==============================================
  let handleUpdateProfile = () => {
    setVisibleProfileWindow(true);
  };

  // ============== Cancle Button ==================
  let handleCancle = () => {
    setVisibleProfileWindow(false);
  };

  // ================= Window hide Function ===========
  let handleUpdateWindow = (e) => {
    if (!profileRef.current.contains(e.target)) {
      setVisibleProfileWindow(false);
    }
  };

  // =================== Teact Copper Function ==================

  const onChange = (e) => {
    e.preventDefault();
    let files;

    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      console.log(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    // ============= Profile Pic Here =============
    <div className="sidebar-layout">
      <div onClick={handleUpdateProfile} className="profile-layout">
        <img src={Profile} alt="Profile Image" />
        <div className="profile-overly">
          <FaCloudUploadAlt className="profile-update-icon" />
        </div>
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

      {/* ======================================== 
                Profile Upadate - Window 
      ========================================== */}

      {visibleProfileWindow && (
        <div onClick={handleUpdateWindow} className="profile-update-window">
          <div ref={profileRef} className="window-image-box">
            <h2>Update your profile</h2>

            <input type="file" onChange={onChange} />

            {/* ===============================
                      React Copper Start 
              ================================= */}

            {image && (
              <div className="preview-window-box">
                <Cropper
                  ref={cropperRef}
                  style={{ height: "60%", width: "60%" }}
                  initialAspectRatio={1}
                  preview=".img-preview"
                  src={image}
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                  guides={true}
                />
                <div className="show-preview-img-box">
                  <div className="img-preview show-preview-img"></div>
                </div>
              </div>
            )}
            {/* ===============================
                      React Copper End 
              ================================= */}
            <div className="window-button-box">
              <MyButton onClick={handleCancle} className="signup-button" variant="contained">
                Cancle
              </MyButton>
              <MyButton onClick={getCropData} className="signup-button" variant="contained">
                Upload
              </MyButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
