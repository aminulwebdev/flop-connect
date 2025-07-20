import React from "react";
import Grid from "@mui/material/Grid";
import UserList from "../layout/UserList";
import GroupsList from "../layout/GroupsList";
import FriendsList from "../layout/FriendsList";
import FriendRequestList from "../layout/FriendRequestList";
import MyGroupsList from "../layout/MyGroupsList";
import BlockedUsersList from "../layout/BlockedUsersList";

const Home = () => {
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
