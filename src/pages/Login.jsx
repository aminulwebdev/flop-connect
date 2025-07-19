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
  margin: "55px 0 35px",
  fontSize: "20px",
  fontWeight: "600",
  textTransform: "none",
});

const Login = () => {
  //============= Password Show/Hide useState ===============
  let [showPass, setShowPass] = useState(false);
  //============= Password Show/Hide Icon useState ===============
  let [input, setInput] = useState("");

  //============= Password Show/Hide function ===============
  let handleShowPassword = () => {
    setShowPass(!showPass);
  };
  //============= Password Show/Hide Icon function ===============
  let handleInput = (e) => {
    setInput(e.target.value);
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
              <MyInput id="standard-basic" label="Email Address" variant="standard" />

              {/* ============= Password Input Field========= */}
              <div className="password-input">
                <MyInput onChange={handleInput} value={input} type={showPass ? "text" : "password"} id="standard-basic" label="Password" variant="standard" /> {/* Condition Apply */}
                {input && (
                  <div onClick={handleShowPassword} className="login-icon-box">
                    {/* Click koranor jonno - "onClick" deya hoaeche */}
                    {showPass ? <FiEye /> : <FiEyeOff />} {/* Condition Apply */}
                  </div>
                )}
              </div>
            </div>

            {/* ============= Login Button ========= */}
            <MyButton className="signup-button" variant="contained">
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
