import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import RegistrationImage from "../assets/reg.png";

// =========== Text Field Customization =============

const MyInput = styled(TextField)({
  width: "60%",
  "& label.Mui-focused": {
    color: "#595d8e",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#c0cdddff",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#b8bacf",
    },
  },
});

// =========== Text Field Customization =============

const BootstrapButton = styled(Button)({
  boxShadow: "none",
});

const Registration = () => {
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
              <MyInput id="outlined-basic" label="Password" variant="outlined" />
            </div>
            {/* ============= Sign Up Button ========= */}
            <Button variant="contained">Contained</Button>
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
