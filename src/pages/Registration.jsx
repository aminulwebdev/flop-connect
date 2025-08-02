import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import RegistrationImage from "../assets/reg.png"; // ============ Profile ============

import { FiEye, FiEyeOff } from "react-icons/fi";

import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth"; // ============ Firebase import ============
import { ToastContainer, toast, Bounce, Flip } from "react-toastify"; // ============ React Toastify ============
import { RotatingLines } from "react-loader-spinner"; // ============ React loader ============
import { Link, useNavigate } from "react-router-dom"; // ============ Link, Navigate ============

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
      paddingRight: "70px",
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
  const auth = getAuth(); // ============ Firebase auth ============

  let [showPass, setShowPass] = useState(false); //============= Password Show/Hide useState ===============
  let [input, setInput] = useState(""); //============= Password - Icon blank input field e Show/Hide useState ===============
  let [email, setEmail] = useState(""); //============= Email Show er jonno useState ===============
  let [name, setName] = useState(""); //============= Full Name er jonno useState ===============
  let [password, setPassword] = useState(""); //============= Full Name er jonno useState ===============

  let [emailErr, setEmailErr] = useState(false); //============= Email Error Show korar jonno ===============
  let [nameErr, setNameErr] = useState(false); //============= Full Name Error Show korar jonno ==============
  let [passwordErr, setpasswordErr] = useState(false); //============= Full Name Error Show korar jonno ==============

  let [loader, setLoader] = useState(false); //============= React Loader er jonno useState ==============
  let navigate = useNavigate(); //============= sign up the login - navigate ==============

  //============= Password Show/Hide function ===============
  let handleShowPass = () => {
    setShowPass(!showPass);
  };
  //  ============= Email Input handle Function =========
  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailErr("");
  };
  //  ============= Full Name Input handle Function =========
  let handleName = (e) => {
    setName(e.target.value);
    setNameErr("");
  };
  //  ============= Password Input handle Function =========
  let handlePassword = (e) => {
    setInput(e.target.value);
    setPassword(e.target.value);
    setpasswordErr("");
  };
  //  ============= Sign Up Button Function =========
  let handleSignUp = () => {
    if (!email) {
      setEmailErr("Email is required!");
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailErr("Please enter a valid email address.");
      }
    }

    if (!name) {
      setNameErr("Full name is required!");
    }

    if (!password) {
      setpasswordErr("Password is required!");
    } else if (!/^(?=.*[a-z])/.test(password)) {
      setpasswordErr("Must include a lowercase letter.");
    } else if (!/(?=.*[A-Z])/.test(password)) {
      setpasswordErr("Must include an uppercase letter.");
    } else if (!/(?=.*\d)/.test(password)) {
      setpasswordErr("Must include a number.");
    } else if (!/(?=.*[@$!%*?&])/.test(password)) {
      setpasswordErr("Must include a special character.");
    } else if (!/^[A-Za-z\d@$!%*?&]{8,16}$/.test(password)) {
      setpasswordErr("Minimum 8-16 characters required.");
    }
    if (email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && name && password && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,16}$/.test(password)) {
      setLoader(true); // ============== react loader start ===============
      // ================ firebase Sign up code ==================
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // ==================== Update a user's profile ===============

          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: "https://firebasestorage.googleapis.com/v0/b/flop-connect-fd9fd.firebasestorage.app/o/user-profile.png?alt=media&token=8e0f8cdb-93c5-4f41-b9c7-62fe6cfc3be5",
          }).then(() => {});
          // ==================== Send Email Verification link ===============
          sendEmailVerification(auth.currentUser).then(() => {
            setEmail("");
            setName("");
            setPassword("");
            toast.success("Account created. A verification link has been sent to your email."); // ============== Tostify Message ===============
            setLoader(false); // ============== react loader stop ===============
            setTimeout(() => {
              navigate("/login"); // //============= sign up the login e jete navigate ==============
            }, 1000);
            console.log(userCredential);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/email-already-in-use")) {
            console.log(errorCode);
            toast.error("This email address is already registered.");
            setLoader(false);
          }
        });
    }
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
              <div className="error-message-box">
                <MyInput value={email} onChange={handleEmail} id="outlined-basic" label="Email Address" variant="outlined" />
                {emailErr && <p className="error-message">{emailErr}</p>}
              </div>
              {/* ============= Full Name Input Field========= */}
              <div className="error-message-box">
                <MyInput value={name} onChange={handleName} id="outlined-basic" label="Full Name" variant="outlined" />
                {nameErr && <p className="error-message">{nameErr}</p>}
              </div>
              {/* ============= Password Input Field========= */}
              <div className="password-input error-message-box">
                <MyInput value={password} onChange={handlePassword} type={showPass ? "text" : "password"} id="outlined-basic" label="Password" variant="outlined" />
                {/* Condition Apply */}
                {/*========== onClick=()=>setShowPass(!showpass) - aivabe o lika jay - lada function na likhe ==========  */}
                {input.trim() && (
                  <div onClick={handleShowPass} className="icon-box">
                    {showPass ? <FiEyeOff /> : <FiEye />} {/* ========= Condition Apply ========= */}
                  </div>
                )}
                {passwordErr && <p className="error-message">{passwordErr}</p>}
              </div>
            </div>

            {/* ================= Sign Up Button ============== */}

            {/* ============= Loader customization ========= */}
            {loader ? (
              <div className="loader-icon">
                <RotatingLines visible={true} height="50" width="50" color="grey" strokeWidth="5" animationDuration="0.4" ariaLabel="rotating-lines-loading" wrapperStyle={{}} wrapperClass="" />
              </div>
            ) : (
              <MyButton onClick={handleSignUp} className="signup-button" variant="contained">
                Sign up
              </MyButton>
            )}
            {/* ============= Toastify customization ========= */}
            <ToastContainer
              position="top-centre"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover={false}
              theme="dark"
              transition={Flip}
            />
            <p>
              Already have an account?{" "}
              <Link to="/login">
                <span>Let’s Sign In!</span>
              </Link>
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
