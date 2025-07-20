import React from "react";
import Grid from "@mui/material/Grid";
import UserList from "../layout/UserList";

const Home = () => {
  return (
    <div className="grid-division">
      <Grid container spacing={3}>
        <Grid size={4}>
          <UserList />
        </Grid>
        <Grid size={4}>
            <UserList />
        </Grid>
        <Grid size={4}>
            <UserList />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
