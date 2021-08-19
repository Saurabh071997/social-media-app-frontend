import { Grid, Button, Typography } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PersonIcon from "@material-ui/icons/Person";
import CreateIcon from "@material-ui/icons/Create";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SearchIcon from "@material-ui/icons/Search";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import useStyle from "../appStyle";
import app_icon from "../images/icon.gif";
import default_img from "../images/profile.jpg";
import { logoutUser } from "../features/auth/authSlice";

export const Sidebar = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const UserImgIcon = () => {
    return (
      <img
        src={currentUser?.profileImg ? currentUser?.profileImg : default_img}
        alt="img"
        className={classes.sidebarProfileImg}
      />
    );
  };

  const LogoutModal = () => {
    return (
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          startIcon={
            <ExitToAppIcon
              className={classes.sideIcon}
              style={{ color: "#EF4444" }}
            />
          }
          className={classes.sidebarNavBtn}
          style={{ width: "auto", marginBottom: "0.15rem" }}
          onClick={() => {
            dispatch(logoutUser());
            navigate("/welcome");
          }}
        >
          <Typography
            align="left"
            className={classes.sideText}
            style={{ color: "#EF4444" }}
          >
            Logout
          </Typography>
        </Button>
      </Grid>
    );
  };

  return (
    <>
      <Grid
        container
        direction="column"
        justify="space-between"
        wrap="nowrap"
        style={{ height: "100%", paddingBottom: "1rem" }}
      >
        <Grid item>
          <Grid
            container
            direction="column"
            justify="space-between"
            spacing={2}
          >
            <Grid item>
              <img src={app_icon} alt="img" className={classes.sidebarImg} />
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                startIcon={<HomeIcon className={classes.sideIcon} />}
                className={classes.sidebarNavBtn}
                onClick={() => navigate("/")}
              >
                <Typography align="left" className={classes.sideText}>
                  HOME
                </Typography>
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                startIcon={<NotificationsIcon className={classes.sideIcon} />}
                className={classes.sidebarNavBtn}
                onClick={() => navigate("/notifications")}
              >
                <Typography align="left" className={classes.sideText}>
                  NOTIFICATIONS
                </Typography>
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                startIcon={<SearchIcon className={classes.sideIcon} />}
                className={classes.sidebarNavBtn}
                onClick={() => navigate("/search")}
              >
                <Typography align="left" className={classes.sideText}>
                  Search
                </Typography>
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                startIcon={<PersonIcon className={classes.sideIcon} />}
                className={classes.sidebarNavBtn}
                onClick={() => navigate(`/profile/view/${currentUser?._id}`)}
              >
                <Typography align="left" className={classes.sideText}>
                  Profile
                </Typography>
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                startIcon={<CreateIcon />}
                className={classes.btnCreate}
                onClick={() => navigate("/post/new")}
              >
                POST
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          {modal && <LogoutModal />}
          <div
            style={{ display: "inline-block", cursor: "pointer" }}
            onClick={() => {
              setModal((modal) => !modal);
            }}
          >
            <div className={classes.sidebarProfileBtn}>
              <UserImgIcon />
              <div className={classes.sidebarProfileTxt}>
                <Typography varinat="body1" className="profile-text">
                  {currentUser?.name}{" "}
                </Typography>
                <Typography variant="caption" style={{ color: "#94A3B8" }}>
                  @{currentUser?.username}
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};
