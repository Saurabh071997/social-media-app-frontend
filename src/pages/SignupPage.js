import {
  Container,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./loginPageStyle";
import { NavigationMain } from "./NavigationMain";
import { useWindowSize } from "../utils/useWindowSize";
import {
  signupUserWithCredentials,
  resetAuthStatus,
} from "../features/auth/authSlice";
import { toggleToast } from "../features/toast/toastSlice";

export const ErrorMessage = ({ message }) => {
  return (
    <>
      <Typography align="center" variant="body1" style={{ color: "#EF4444" }}>
        {message}
      </Typography>
    </>
  );
};

export const SignupPage = () => {
  const classes = useStyles();
  const [, width] = useWindowSize();
  const [signupState, setSignupState] = useState({
    name: null,
    username: null,
    email: null,
    password: null,
  });
  const [error, setError] = useState(null);
  const errorTypes = {
    emailFormatError: "emailFormatError",
    emptyFieldError: "emptyFieldError",
    userNameFormatError: "userNameFormatError",
    passwordLengthError: "passwordLengthError",
    nameFormatError: "nameFormatError",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, statusCode } = useSelector((state) => state.auth);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (status === "signup_success" && statusCode === 201) {
      navigate("/login");
      dispatch(
        toggleToast({ toggle: true, message: "account created successfully" })
      );
    }
    if (status === "error" && statusCode === 409) {
      dispatch(toggleToast({ toggle: true, message: "user already exist" }));
    }
    dispatch(resetAuthStatus());
    // eslint-disable-next-line
  }, [status, statusCode]);

  const validateSignUp = () => {
    let regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let usernameregex = /^[a-zA-Z0-9_#$]+$/;
    if (
      !signupState.email ||
      !signupState.name ||
      !signupState.password ||
      !signupState.username
    ) {
      setError(errorTypes.emptyFieldError);
      return false;
    } else if (signupState.name && signupState.length < 1) {
      setError(errorTypes.nameFormatError);
      return false;
    } else if (!usernameregex.test(signupState.username)) {
      setError(errorTypes.userNameFormatError);
      return false;
    } else if (!regex.test(signupState.email)) {
      setError(errorTypes.emailFormatError);
      return false;
    } else if (signupState.password && signupState.password.length < 8) {
      setError(errorTypes.passwordLengthError);
      return false;
    }

    return true;
  };

  const signupHandler = async () => {
    validateSignUp() &&
      dispatch(
        signupUserWithCredentials({
          name: signupState.name,
          username: signupState.username,
          email: signupState.email,
          password: signupState.password,
        })
      );
  };

  return (
    <>
      <NavigationMain />
      <div className={classes.pageBlock}>
        <Typography align="center" gutterBottom className={classes.pageTitle}>
          Create Account
        </Typography>

        <Container maxWidth="sm" className={classes.credentialsContainer}>
          <TextField
            label="Name"
            variant="outlined"
            className={classes.inputFields}
            style={{ width: width < 600 ? "100%" : "60%" }}
            onChange={(e) => {
              setSignupState((signupState) => ({
                ...signupState,
                name: e.target.value.trim(),
              }));
              setError(null);
            }}
          />

          {error === errorTypes.nameFormatError && (
            <ErrorMessage message="Name can't be empty" />
          )}

          <TextField
            label="Username"
            variant="outlined"
            className={classes.inputFields}
            style={{ width: width < 600 ? "100%" : "60%" }}
            onChange={(e) => {
              setSignupState((signupState) => ({
                ...signupState,
                username: e.target.value.trim(),
              }));
              setError(null);
            }}
          />

          {error === errorTypes.userNameFormatError && (
            <ErrorMessage message="Username can only be alphanumeric with _, # and $ allowed" />
          )}

          <TextField
            label="Email"
            variant="outlined"
            className={classes.inputFields}
            style={{ width: width < 600 ? "100%" : "60%" }}
            onChange={(e) => {
              setSignupState((signupState) => ({
                ...signupState,
                email: e.target.value.trim(),
              }));
              setError(null);
            }}
          />

          {error === errorTypes.emailFormatError && (
            <ErrorMessage message="Email must be of type something@something.com" />
          )}

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            className={classes.inputFields}
            style={{ width: width < 600 ? "100%" : "60%" }}
            onChange={(e) => {
              setSignupState((signupState) => ({
                ...signupState,
                password: e.target.value.trim(),
              }));
              setError(null);
            }}
          />

          {error === errorTypes.passwordLengthError && (
            <ErrorMessage message="Password must be of atleast 8 characters" />
          )}

          {error === errorTypes.emptyFieldError && (
            <ErrorMessage message="All fields are mandatory" />
          )}

          <Button
            variant="contained"
            color="primary"
            className={
              status === "loading"
                ? `${classes.btnLogin} ${classes.btnDisabled}`
                : classes.btnLogin
            }
            onClick={signupHandler}
          >
            {status === "loading" ? (
              <CircularProgress style={{ color: "white" }} />
            ) : (
              "Signup"
            )}
          </Button>

          <Typography align="center" className={classes.navText}>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "#075985",
              }}
            >
              <span className={classes.linkText}> Login </span>
            </Link>
          </Typography>
        </Container>
      </div>
    </>
  );
};
