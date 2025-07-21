import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import LoginImage from "../assets/login.png";
import GoogleLogo from "../assets/googlelogo.png";

import { FiEye, FiEyeOff } from "react-icons/fi";

// =========== Text Field Customization =============

const MyInput = styled(TextField)({
  width: "100%",
  borderRadius: "8px",
  "& label.Mui-focused": {
    color: "#595d8e",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#c0cdddff",
      borderRadius: "8px",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#b8bacf",
    },
  },
});

// =========== Button Customization =============

const MyButton = styled(Button)({
  width: "100%",
  borderRadius: "9px",
  height: "68px",
  margin: "60px 0 35px",
  fontSize: "20px",
  fontWeight: "600",
  textTransform: "none",
});

const Login = () => {
  let [showPass, setShowPass] = useState(false); //============= Password Show/Hide useState ===============
  let [input, setInput] = useState(""); //============= Password - Icon blank input field e Show/Hide useState ===============
  let [email, setEmail] = useState(""); //============= Email Show er jonno useState ===============
  let [password, setPassword] = useState(""); //============= Password er jonno useState ===============

  let [emailErr, setEmailErr] = useState(false); //============= Email Error Show korar jonno ===============
  let [passwordErr, setpasswordErr] = useState(false);

  //============= Password Show/Hide function ===============
  let handleShowPassword = () => {
    setShowPass(!showPass);
  };

  //  ============= Email Input handle Function =========
  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailErr("");
  };

  //============= Password - Icon Show/Hide  function ===============
  let handlePassword = (e) => {
    setInput(e.target.value);
    setPassword(e.target.value);
    setpasswordErr("");
  };

  //  ============= Login Button Function =========
  let handleLogin = () => {
    if (!email) {
      setEmailErr("Email is required!");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailErr("Please enter a valid email address.");
      }
    }

    if (!password) {
      setpasswordErr("Password is required!");
    } else if (!/(?=.*[a-z])/.test(password)) {
      setpasswordErr("Must include a lowercase letter.");
    } else if (!/(?=.*[A-Z])/.test(password)) {
      setpasswordErr("Must include an uppercase letter.");
    } else if (!/(?=.*\d)/.test(password)) {
      setpasswordErr("Must include a number.");
    } else if (!/(?=.*[@$!%*?&])/.test(password)) {
      setpasswordErr("Must include a special character.");
    } else if (!/([A-Za-z\d@$!%*?&]{8,}$)/.test(password)) {
      setpasswordErr("Minimum 8 characters required.");
    }
    if (email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && password) {
      console.log("All done");
    }
  };

  return (
    <Grid container>
      <Grid size={6}>
        <div className="login-content-box">
          <div className="login-content">
            <h2>Login to Flop Connect</h2>
            <div className="logo-box">
              <img src={GoogleLogo} alt="" />
              <span>Login with Google</span>
            </div>
            <div className="login-input-field">
              {/* ============= Email Input Field========= */}
              <div className="error-message-box">
                <MyInput onChange={handleEmail} id="standard-basic" label="Email Address" variant="standard" />
                {emailErr && <p className="error-message">{emailErr}</p>}
              </div>
              {/* ============= Password Input Field========= */}
              <div className="password-input error-message-box">
                <MyInput onChange={handlePassword} value={input} type={showPass ? "text" : "password"} id="standard-basic" label="Password" variant="standard" /> {/* Condition Apply */}
                {input.trim() && (
                  <div onClick={handleShowPassword} className="login-icon-box">
                    {/* Click koranor jonno - "onClick" deya hoaeche */}
                    {showPass ? <FiEye /> : <FiEyeOff />} {/* Condition Apply */}
                  </div>
                )}
                {passwordErr && <p className="error-message">{passwordErr}</p>}
              </div>
            </div>

            {/* ============= Login Button ========= */}
            <MyButton onClick={handleLogin} className="signup-button" variant="contained">
              Login to Continue
            </MyButton>

            <p>
              Don’t have an account ? <span>Sign up & join the Flop!</span>{" "}
            </p>
          </div>
        </div>
      </Grid>
      {/* ============ Image Here =========== */}
      <Grid size={6}>
        <img className="reg-img" src={LoginImage} alt="" />
      </Grid>
    </Grid>
  );
};

export default Login;
