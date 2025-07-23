import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import LoginImage from "../assets/login.png";
import GoogleLogo from "../assets/googlelogo.png";

import { FiEye, FiEyeOff } from "react-icons/fi"; // ============ React eye icon ============
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth"; // ============ Firebase import ============
import { Flip, Slide, ToastContainer, toast } from "react-toastify"; // ============ React Toastify ============
import { RotatingLines } from "react-loader-spinner"; // ============ React loader ============

import { Link, useNavigate } from "react-router-dom"; // ============ Link, Navigate ============
import { useDispatch } from "react-redux"; // ============ Data pathnor jonno disPatch ============
import { userDetails } from "../slices/userInfoSlice"; // ============  disPatch theke data aei slice e jabe ============

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
  margin: "60px 0 30px",
  fontSize: "20px",
  fontWeight: "600",
  textTransform: "none",
});

const Login = () => {
  const auth = getAuth(); // ============ Firebase auth ============
  const provider = new GoogleAuthProvider(); //  ============ Firebase Google provider ============

  let [showPass, setShowPass] = useState(false); //============= Password Show/Hide useState ===============
  let [input, setInput] = useState(""); //============= Password - Icon blank input field e Show/Hide useState ===============
  let [email, setEmail] = useState(""); //============= Email Show er jonno useState ===============
  let [password, setPassword] = useState(""); //============= Password er jonno useState ===============
  let [forgotEmail, setForgotEmail] = useState(""); //============= Forget  Password - Email State ===============

  let [emailErr, setEmailErr] = useState(false); //============= Email Error Show korar jonno ===============
  let [passwordErr, setpasswordErr] = useState(false); //============= Password Error Show korar jonno ===============
  let [forgotEmailErr, setForgotEmailErr] = useState(false); //============= Forget Password  - Email Error State ===============

  let [forgotUI, setforgotUI] = useState(false); //============= Forget Password  UI ===============

  let [loader, setLoader] = useState(false); //============= React Loader er jonno useState ==============

  let navigate = useNavigate(); //============= sign up the login - navigate ==============
  let disPatch = useDispatch(); //============= Data pathnor jonno aei hook - Dispatch==============

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

  //  ============= Login Button Function =================
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
    }

    if (email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && password) {
      setLoader(true); // ============== react loader start ===============
      // ================ firebase Login code ==================
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          if (userCredential.user.emailVerified) {
            //  console.log(userCredential.user);
            disPatch(userDetails(userCredential.user)); // ============ Aei page theke disPatch maddme data - userDetails - slice e jabe ============
             localStorage.setItem("userinfo",JSON.stringify(userCredential.user)); // ============ localStorage e data save rakaha - ja sudu string data rakhe ============


            // toast.success("Login successful. Welcome back!");
            navigate("/pages/home");
            setLoader(false); // ============== react loader start ===============
          } else {
            toast.error("Email not verified. Check your inbox to verify your account.");
            setLoader(false); // ============== react loader stop ===============
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/invalid-credential")) {
            toast.error("Incorrect email or password.");
            setLoader(false); // ============== react loader stop ===============
          } else if (errorCode.includes("auth/too-many-requests")) {
            toast.error("Too many attempts. Please try again later.");
            setLoader(false); // ============== react loader stop ===============
            console.log(errorCode);
          }
        });
    }
  };

  //  ============= Login With Google - Function =========

  let handleGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/pages/home");
        console.log("google login");
      })
      .catch((error) => {
        const errorCode = error.code;
        // console.log(errorCode);
      });
  };

  //    ===========================================
  //        New UI Forgot Password - Function
  //   ===========================================

  // ============= I forgot my password pera function ===============
  let HandleforgetPassword = () => {
    setforgotUI(true);
  };
  let handleBackLogin = () => {
    setforgotUI(false);
  };

  let handleForgotEmail = (e) => {
    setForgotEmail(e.target.value);
    setForgotEmailErr("");
  };

  let handleSendButton = () => {
    if (!forgotEmail) {
      setForgotEmailErr("Email is required!");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(forgotEmail)) {
      setForgotEmailErr("Please enter a valid email address.");
    }

    if (forgotEmail && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(forgotEmail)) {
      sendPasswordResetEmail(auth, forgotEmail)
        .then(() => {
          toast.success("Reset link sent. Please check your inbox or spam folder.");
          setForgotEmail("");
          setTimeout(() => {
            setforgotUI(false);
          }, 3000);
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          if (errorCode.includes("auth/too-many-requests")) {
            toast.error("Too many attempts. Please try again later.");
          }
        });
    }
  };

  return (
    <>
      <Grid container>
        <Grid size={6}>
          <div className="login-content-box">
            <div className="login-content">
              <h2>Login to Flop Connect</h2>
              {/* ===============  login with google ========== */}
              <div onClick={handleGoogle} className="logo-box">
                <img src={GoogleLogo} alt="" />
                <span>Login with Google</span>
              </div>
              <div className="login-input-field">
                {/* ============= Email Input Field========= */}
                <div className="error-message-box">
                  <MyInput value={email} onChange={handleEmail} id="standard-basic" label="Email Address" variant="standard" />
                  {emailErr && <p className="error-message">{emailErr}</p>}
                </div>
                {/* ============= Password Input Field========= */}
                <div className="password-input error-message-box">
                  <MyInput value={password} onChange={handlePassword} type={showPass ? "text" : "password"} id="standard-basic" label="Password" variant="standard" /> {/* Condition Apply */}
                  {/*========== onClick=()=>setShowPass(!showpass) - aivabe o lika jay - lada function na likhe ==========  */}
                  {input.trim() && (
                    <div onClick={handleShowPassword} className="login-icon-box">
                      {showPass ? <FiEyeOff /> : <FiEye />} {/* Condition Apply */}
                    </div>
                  )}
                  {passwordErr && <p className="error-message">{passwordErr}</p>}
                </div>
              </div>
              {/* ============= Login Button ========= */}
              {/* ============= Loader customization ========= */}
              {loader ? (
                <div className="login-loader-icon">
                  <RotatingLines visible={true} height="50" width="50" color="grey" strokeWidth="5" animationDuration="0.4" ariaLabel="rotating-lines-loading" wrapperStyle={{}} wrapperClass="" />
                </div>
              ) : (
                <MyButton onClick={handleLogin} className="signup-button" variant="contained">
                  Login to Continue
                </MyButton>
              )}
              {/* ============= Toastify customization for Error message ========= */}
              <ToastContainer
                position="top-centre"
                autoClose={2000}
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

              {/* ============== Forget Password ============== */}
              <h3 onClick={HandleforgetPassword} className="forget-password">
                I forgot my password
              </h3>
              <p>
                Don’t have an account ?{" "}
                <Link to="/">
                  <span>Sign up & join the Flop!</span>
                </Link>
              </p>
            </div>
          </div>
        </Grid>
        {/* ============ Image Here =========== */}
        <Grid size={6}>
          <img className="reg-img" src={LoginImage} alt="" />
        </Grid>
      </Grid>

      {/*============================================ 
                    Forgot Password UI Here
      ============================================= */}
      {forgotUI && (
        <div className="ui-for-forgotpassword">
          {/* ============= Toastify customization for Error message ========= */}
          <ToastContainer
            position="top-center"
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
          <div className="forgotpassword-box-ui">
            {/* ============= Email Input Field=========  */}
            <div className="error-message-box ">
              <MyInput value={forgotEmail} onChange={handleForgotEmail} id="outlined-basic" label="Email Address" variant="outlined" />
              {forgotEmailErr && <p className="error-message">{forgotEmailErr}</p>}
            </div>
            <div className="forget-button">
              <MyButton onClick={handleBackLogin} className="signup-button" variant="contained">
                Back to Login
              </MyButton>
              <MyButton onClick={handleSendButton} className="signup-button" variant="contained">
                Send Link
              </MyButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
