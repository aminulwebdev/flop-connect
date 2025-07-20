import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import RegistrationImage from "../assets/reg.png";

import { FiEye, FiEyeOff } from "react-icons/fi";

// =========== Text Field Customization =============

const MyInput = styled(TextField)({
  width: "60%",
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
    "&.MuiInputBase-input": {
      paddingRight: "70px"
    },
  },
});

// =========== Button Customization =============

const MyButton = styled(Button)({
  width: "60%",
  borderRadius: "87px",
  height: "68px",
  margin: "50px 0 35px",
  fontSize: "20px",
  fontWeight: "600",
  textTransform: "none",
});

const Registration = () => {
  //============= Password Show/Hide useState ===============
  let [showPass, setShowPass] = useState(false);

  //============= Password - Icon Show/Hide useState ===============
  let [input, setInput] = useState("");

  //============= Password Show/Hide function ===============
  let handleShowPass = () => {
    setShowPass(!showPass);
  };

  let handleInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <Grid container>
      <Grid size={6}>
        <div className="reg-content-box">
          <div className="reg-content">
            <h2>Kick Off Your Chat with Flop Connect!</h2>
            <p>
              Free register <span>and</span> enjoy the Flop Show vibe!
            </p>
            <div className="input-field">
              {/* ============= Email Input Field========= */}
              <MyInput id="outlined-basic" label="Email Address" variant="outlined" />

              {/* ============= Full Name Input Field========= */}
              <MyInput id="outlined-basic" label="Full Name" variant="outlined" />

              {/* ============= Password Input Field========= */}
              <div className="password-input">
                <MyInput onChange={handleInput} value={input} type={showPass ? "text" : "password"} id="outlined-basic" label="Password" variant="outlined" /> {/* Condition Apply */}
                {input.trim() && (
                  <div onClick={handleShowPass} className="icon-box">
                    {/* Click koranor jonno - "onClick" deya hoaeche */}
                    {showPass ? <FiEye /> : <FiEyeOff />} {/* Condition Apply */}
                  </div>
                )}
              </div>
            </div>

            {/* ============= Sign Up Button ========= */}
            <MyButton className="signup-button" variant="contained">
              Sign up
            </MyButton>

            <p>
              Already have an account? <span>Let’s Sign In!</span>{" "}
            </p>
          </div>
        </div>
      </Grid>
      {/* ============ Image Here =========== */}
      <Grid size={6}>
        <img className="reg-img" src={RegistrationImage} alt="" />
      </Grid>
    </Grid>
  );
};

export default Registration;
