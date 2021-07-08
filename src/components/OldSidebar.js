import { Grid, Typography, Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PersonIcon from "@material-ui/icons/Person";
import CreateIcon from "@material-ui/icons/Create";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useSelector } from "react-redux";
import useAppStyle from "../appStyle";
import app_img from "../images/icon.gif";
import default_img from "../images/profile.jpg";
import { useState } from "react";

export const Sidebar = () => {
  const classes = useAppStyle();
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);

  const LogoutModal = () => {
    return (
      <div className={classes.logoutDiv}>
        <ExitToAppIcon
          style={{
            color: "#EF4444",
            height: "2rem",
            width: "2rem",
            marginRight: "1rem",
          }}
        />
        <Typography style={{ color: "#EF4444", fontSize: "1.5rem" }}>
          Logout
        </Typography>
      </div>
    );
  };

  return (
    <div className={classes.sidebar}>
      <img src={app_img} className={classes.sidebarImg} alt="img" />
      <Grid container direction="column" spacing={2}>
        <Grid item style={{ display: "inline-block" }}>
          <div className={`${classes.sidebarDiv}`}>
            <HomeIcon className={classes.sidebarDivIcon} />
            <Typography className={classes.sidebarDivTxt}>Home</Typography>
          </div>
        </Grid>

        <Grid item style={{ display: "inline-block" }}>
          <div className={`${classes.sidebarDiv}`}>
            <NotificationsIcon className={classes.sidebarDivIcon} />
            <Typography className={classes.sidebarDivTxt}>
              Notifications
            </Typography>
          </div>
        </Grid>

        <Grid item style={{ display: "inline-block" }}>
          <div className={`${classes.sidebarDiv}`}>
            <PersonIcon className={classes.sidebarDivIcon} />
            <Typography className={classes.sidebarDivTxt}>Profile</Typography>
          </div>
        </Grid>

        <Grid item style={{ display: "inline-block" }}>
          <Button
            variant="contained"
            color="primary"
            className={classes.btnNewPost}
          >
            <CreateIcon className={classes.sidebarDivIcon} />
            <Typography
              className={classes.sidebarDivTxt}
              style={{ fontSize: "1.5rem" }}
            >
              Post
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <div style={{ height: "5vh" }}></div>

      <div style={{ position: "absolute", bottom: "0.5em" }}>
        {showModal && <LogoutModal />}
        <div style={{ display: "inline-block" }}>
          <div
            className={classes.sidebarProfileDiv}
            onClick={() => {
              setShowModal((showModal) => !showModal);
            }}
          >
            <img
              src={
                currentUser?.profileImg ? currentUser?.profileImg : default_img
              }
              alt="img"
              className={classes.sidebarProfileImg}
            />
            <div className={classes.sidebarProfileTxt}>
              <div className={classes.sidebarProfileTxtMain}>
                {currentUser?.name}
              </div>

              <div className={classes.sidebarProfileTxtSub}>
                {`@${currentUser?.username}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
