import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import UserList from "../layout/UserList";
import GroupsList from "../layout/GroupsList";
import FriendsList from "../layout/FriendsList";
import FriendRequestList from "../layout/FriendRequestList";
import MyGroupsList from "../layout/MyGroupsList";
import BlockedUsersList from "../layout/BlockedUsersList";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate(); // ============ Link, Navigate ============
  let data = useSelector((state) => state.userInfo.value); // ================ Onno page er data  ache - ta aei page use korte useState hook ===============
  console.log(data);

  useEffect(() => {
    if (!data) {
      navigate("/login"); 
    }
  }, []);

  return (
    <div className="grid-division">
      <Grid container spacing={3}>
        <Grid size={4}>
          <GroupsList />
        </Grid>

        <Grid size={4}>
          <FriendsList />
        </Grid>

        <Grid size={4}>
          <UserList />
        </Grid>

        <Grid size={4}>
          <FriendRequestList />
        </Grid>

        <Grid size={4}>
          <MyGroupsList />
        </Grid>

        <Grid size={4}>
          <BlockedUsersList />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
