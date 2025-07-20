import React from "react";
import profile2 from "../assets/profile2.jpg";

function SingleUser() {
  return (
    <div className="title-profile">
      <div className="title-pera">
        <div className="image-box">
          <img src={profile2} alt="" />
        </div>
        <div>
          <h4>Mr. Flop</h4>
          <p>flop.show.mak</p>
        </div>
      </div>
      <button>Join</button>
    </div>
  );
}

export default SingleUser;
