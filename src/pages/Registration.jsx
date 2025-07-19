import React from "react";
import Grid from "@mui/material/Grid";
import RegistrationImage from "../assets/reg.png"

const Registration = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <h1>This Flop Show</h1>
      </Grid>
      <Grid size={6}>
        <img className="reg-img" src={RegistrationImage} alt="" />
      </Grid>
    </Grid>
  );
};

export default Registration;
