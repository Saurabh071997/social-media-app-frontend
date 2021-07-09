import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import FlareIcon from "@material-ui/icons/Flare";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useStyle from "./notificationStyle";
import useAppStyle from "../../appStyle";
import { useWindowSize } from "../../utils/useWindowSize";
import {
  getUserNotifications,
  updateUserNotifications,
} from "./notificationSlice";
import { NavigationMob } from "../../components/NavigationMob";
import { Sidebar } from "../../components/Sidebar";
import default_img from "../../images/profile.jpg";

export const NotificationLayout = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { status, notifications } = useSelector((state) => state.notification);

  const notifyHandler = () => {
    // console.log("marked as read");
    dispatch(updateUserNotifications(notifications));
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar className={classes.navLayout}>
          <Typography
            align="left"
            className={classes.pageTitle}
            style={{ flexGrow: 1 }}
          >
            Notifications
          </Typography>

          {status === "pending" && (
            <CircularProgress size="2rem" className={classes.pageProgress} />
          )}

          {notifications?.length > 0 && (
            <Button
              variant="contained"
              color="primary"
              className={classes.btnRead}
              onClick={notifyHandler}
            >
              Mark as read
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {(!notifications || notifications?.length < 1) && (
        <Typography
          variant="h5"
          align="center"
          style={{ color: "#94A3B8", marginTop: "2rem" }}
        >
          No New Notifications Yet
        </Typography>
      )}

      <div style={{ display: "flex", flexDirection: "column-reverse" }}>
        {notifications?.map((notificationItem) => {
          const type = ["LIKE", "COMMENT", "NEW_POST"];
          const time = moment(notificationItem?.createdAt).fromNow();
          if (notificationItem?.__target === notificationItem?.__source?._id)
            return <div>{null}</div>;

          return (
            <div key={notificationItem?._id} className={classes.notifyDiv}>
              <div className={classes.notifyDivIcon}>
                <FlareIcon
                  className={
                    notificationItem?.read
                      ? `${classes.notifyIcon} ${classes.colorRead}`
                      : `${classes.notifyIcon} ${classes.colorUnRead}`
                  }
                />
              </div>
              <div className={classes.notifyDivContent}>
                <div style={{ display: "flex", marginBottom: "0.25rem" }}>
                  <img
                    src={
                      notificationItem?.__source?.profileImg
                        ? notificationItem?.__source?.profileImg
                        : default_img
                    }
                    alt="img"
                    className={classes.notifyUserImg}
                  />
                  <Typography
                    variant="subtitle2"
                    style={{ alignSelf: "center", color: "#94A3B8" }}
                  >
                    {time}
                  </Typography>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div className={classes.notifyMsg}>
                    <Link
                      to={`/profile/view/${notificationItem?.__source?._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <span className={classes.notifyUser}>
                        {notificationItem?.__source?.name}
                      </span>
                    </Link>
                    {notificationItem?.notificationType === "LIKE" && (
                      <span className={classes.notifyMsg}>liked your post</span>
                    )}

                    {notificationItem?.notificationType === "COMMENT" && (
                      <span className={classes.notifyMsg}>
                        commented on your post
                      </span>
                    )}

                    {notificationItem?.notificationType === "NEW_POST" && (
                      <span className={classes.notifyMsg}>
                        shared a new post
                      </span>
                    )}

                    {notificationItem?.notificationType === "NEW_FOLLOWER" && (
                      <span className={classes.notifyMsg}>
                        started following you
                      </span>
                    )}
                  </div>

                  {type.includes(notificationItem?.notificationType) && (
                    <Typography variant="body1" className={classes.notifyPost}>
                      {notificationItem?.__post?.content}
                    </Typography>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ minHeight: "10vh" }}></div>
    </>
  );
};

export const NotificationsDesktop = () => {
  const classes = useAppStyle();
  return (
    <div className={classes.pageContainer}>
      <Container maxWidth="lg">
        <Grid container direction="row">
          <Grid item className="flex-left">
            <Sidebar />
          </Grid>
          <Grid item className={classes.flexRight}>
            <NotificationLayout />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export const NotificationsMob = () => {
  const appStyleClasses = useAppStyle();
  return (
    <div className={appStyleClasses.pageContainer}>
      <NavigationMob />
      <NotificationLayout />
    </div>
  );
};

export const Notifications = () => {
  const [, width] = useWindowSize();
  const dispatch = useDispatch();
  const { isUserAvailable } = useSelector((state) => state.auth);
  useEffect(() => {
    isUserAvailable && dispatch(getUserNotifications());
  }, [isUserAvailable, dispatch]);

  return width <= 700 ? <NotificationsMob /> : <NotificationsDesktop />;
};
