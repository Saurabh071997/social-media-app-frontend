// import axios from "axios";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event";
import EmailIcon from "@material-ui/icons/Email";
import RoomIcon from "@material-ui/icons/Room";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useWindowSize } from "../../utils/useWindowSize";
import useAppStyle from "../../appStyle";
import useStyle from "./profileStyle";
import { NavigationMob } from "../../components/NavigationMob";
import { getUserProfile } from "./profileSlice";
import default_img from "../../images/profile.jpg";
import { Typography } from "@material-ui/core";

export const ProfileLayout = () => {
  const classes = useStyle();
  const { profileUser } = useSelector((state) => state.profile);
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate()

  const [pageState, setPageState] = useState("posts");

  return (
    <>
      <AppBar position="sticky">
        <Toolbar className={classes.navLayout}>Profile</Toolbar>
      </AppBar>

      <div className={classes.componentBlock}>
        <div style={{ display: "flex" }}>
          <img
            src={
              profileUser?.profileImg ? profileUser?.profileImg : default_img
            }
            className={classes.profileImg}
            alt="img"
          />
          <div className={classes.flexCol} style={{ marginTop: "1rem" }}>
            <Typography className={classes.profileName}>
              {profileUser?.name}
            </Typography>
            <Typography
              className={classes.profileUserName}
            >{`@${profileUser?.username}`}</Typography>
          </div>
        </div>

        {currentUser?._id === profileUser?._id && (
          <div style={{ position: "relative" }}>
            <Button
              variant="contained"
              color="primary"
              className={classes.btnEdit}
              onClick={()=>navigate('/profile/edit')}
            >
              Edit Profile
            </Button>
          </div>
        )}

        {profileUser?.bio && (
          <Typography variant="body1" gutterBottom style={{ color: "#E2E8F0" , padding:"0.5rem"}}>
            {profileUser?.bio}
          </Typography>
        )}

        <div className={classes.profileExtras}>
          <div className={classes.profileExtraDiv}>
            <EventIcon className={classes.profileExtraIcon} />
            <Typography className={classes.profileExtraTxt}>Joined:</Typography>
            <Typography className={classes.profileExtraInfo}>
              {`${" "}${profileUser?.createdAt.split("T")[0]}`}
            </Typography>
          </div>

          {profileUser?.dateofbirth && (
            <div className={classes.profileExtraDiv}>
              <EventIcon className={classes.profileExtraIcon} />
              <Typography className={classes.profileExtraTxt}>Born:</Typography>
              <Typography className={classes.profileExtraInfo}>
                {`${" "}${profileUser?.dateofbirth}`}
              </Typography>
            </div>
          )}

          <div className={classes.profileExtraDiv}>
            <EmailIcon className={classes.profileExtraIcon} />
            <Typography className={classes.profileExtraTxt}>Email: </Typography>
            <Typography className={classes.profileExtraInfo}>
              {`${" "}${profileUser?.email}`}
            </Typography>
          </div>

          {profileUser?.location && (
            <div className={classes.profileExtraDiv}>
              <RoomIcon className={classes.profileExtraIcon} />
              <Typography className={classes.profileExtraInfo}>
                {`${" "}${profileUser?.location}`}
              </Typography>
            </div>
          )}
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", padding: "0.25rem 0.5rem" }}>
            <Typography className={classes.profileFollowTxt}>
              Followers:
            </Typography>
            <Typography className={classes.profileFollowCount}>
              {profileUser?.followerCount}
            </Typography>
          </div>

          <div style={{ display: "flex", padding: "0.25rem 0.5rem" }}>
            <Typography className={classes.profileFollowTxt}>
              Following:
            </Typography>
            <Typography className={classes.profileFollowCount}>
              {profileUser?.followingCount}
            </Typography>
          </div>
        </div>
      </div>

      <div className={classes.flexCol} style={{ marginTop: "1rem" }}>
        <div className={classes.profileSectionHead}>
          <Typography
            align="center"
            className={classes.profileSectionHeadTxt}
            onClick={() => setPageState("posts")}
            style={{
              color: pageState === "posts" ? "#3B82F6" : "#CBD5E1",
              borderBottom: pageState === "posts" ? "2px solid #3B82F6" : null,
            }}
          >
            Posts
          </Typography>
          <Typography
            align="center"
            className={classes.profileSectionHeadTxt}
            onClick={() => setPageState("following")}
            style={{
              color: pageState === "following" ? "#3B82F6" : "#CBD5E1",
              borderBottom:
                pageState === "following" ? "2px solid #3B82F6" : null,
            }}
          >
            Following
          </Typography>
          <Typography
            align="center"
            className={classes.profileSectionHeadTxt}
            onClick={() => setPageState("followers")}
            style={{
              color: pageState === "followers" ? "#3B82F6" : "#CBD5E1",
              borderBottom:
                pageState === "followers" ? "2px solid #3B82F6" : null,
            }}
          >
            Followers
          </Typography>
        </div>
      
      </div>
    </>
  );
};

export const ProfileDesktop = () => {
  return <></>;
};

export const ProfileMob = () => {
  const appStyleClasses = useAppStyle();
  return (
    <div className={appStyleClasses.pageContainer}>
      <NavigationMob />
      <ProfileLayout />
    </div>
  );
};

export const Profile = () => {
  const [, width] = useWindowSize();
  const { profileId } = useParams();
  const dispatch = useDispatch();

  const { status: authStatus } = useSelector((state) => state.auth);

  useEffect(() => {
    authStatus === "user_available" && dispatch(getUserProfile(profileId));
  }, [dispatch, profileId, authStatus]);

  return width <= 600 ? <ProfileMob /> : <ProfileDesktop />;
};
