import {
  Container,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./loginPageStyle";
import { NavigationMain } from "./NavigationMain";
import { useWindowSize } from "../utils/useWindowSize";
import {
  loginUserWithCredentials,
  resetAuthStatus,
} from "../features/auth/authSlice";
import { toggleToast } from "../features/toast/toastSlice";
import { ErrorMessage } from "./SignupPage";

export const LoginPage = () => {
  const classes = useStyles();
  const [, width] = useWindowSize();
  const [loginState, setLoginState] = useState({
    usermail: null,
    userpassword: null,
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, statusCode } = useSelector((state) => state.auth);

  const loginHandler = () => {
    if (
      !loginState?.usermail ||
      loginState?.usermail?.length < 1 ||
      !loginState?.userpassword ||
      loginState?.userpassword?.length < 1
    ) {
      setError(true);
    } else {
      dispatch(
        loginUserWithCredentials({
          usermail: loginState?.usermail,
          userpassword: loginState?.userpassword,
        })
      );
    }
  };

  const guestLogin = () => {
    dispatch(
      loginUserWithCredentials({
        usermail: "guest@mail.com",
        userpassword: "123456789",
      })
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (status === "tokenReceived") {
      dispatch(resetAuthStatus());
      navigate("/");
    }
    if (statusCode === 400) {
      dispatch(toggleToast({ toggle: true, message: "Invalid Credentials" }));
      dispatch(resetAuthStatus());
    }

    status === "error" && dispatch(resetAuthStatus());
  }, [status, statusCode, dispatch, navigate]);

  return (
    <>
      <NavigationMain />
      <div className={classes.pageBlock}>
        <Typography align="center" gutterBottom className={classes.pageTitle}>
          Login
        </Typography>
        <Container maxWidth="sm" className={classes.credentialsContainer}>
          <TextField
            label="Email"
            variant="outlined"
            className={classes.inputFields}
            style={{ width: width < 600 ? "100%" : "60%" }}
            onChange={(e) => {
              setLoginState((loginState) => ({
                ...loginState,
                usermail: e.target.value.trim(),
              }));
              setError(false);
            }}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            className={classes.inputFields}
            style={{ width: width < 600 ? "100%" : "60%" }}
            onChange={(e) => {
              setLoginState((loginState) => ({
                ...loginState,
                userpassword: e.target.value.trim(),
              }));
              setError(false);
            }}
          />
          {error && (
            <ErrorMessage message="Please fill the fields with appropriate values" />
          )}

          <Button
            variant="contained"
            color="primary"
            className={
              status === "loading"
                ? `${classes.btnLogin} ${classes.btnDisabled}`
                : classes.btnLogin
            }
            onClick={loginHandler}
          >
            {status === "loading" ? (
              <CircularProgress size="2rem" style={{ color: "white" }} />
            ) : (
              "Login"
            )}
          </Button>

          <Typography
            align="center"
            style={{
              fontSize: "1.15rem",
              color: "#0C4A6E",
              fontWeight: "bold",
            }}
          >
            Or
          </Typography>

          <Button
            variant="contained"
            color="primary"
            className={
              status === "loading"
                ? `${classes.btnLogin} ${classes.btnDisabled}`
                : classes.btnLogin
            }
            onClick={guestLogin}
          >
            {status === "loading" ? (
              <CircularProgress size="2rem" style={{ color: "white" }} />
            ) : (
              "Login as Guest"
            )}
          </Button>

          <Typography align="center" className={classes.navText}>
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                color: "#075985",
              }}
            >
              <span className={classes.linkText}>Sign up</span>
            </Link>
          </Typography>
        </Container>
      </div>
    </>
  );
};
