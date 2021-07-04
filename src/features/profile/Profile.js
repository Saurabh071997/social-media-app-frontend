import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event";
import EmailIcon from "@material-ui/icons/Email";
import RoomIcon from "@material-ui/icons/Room";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useWindowSize } from "../../utils/useWindowSize";
import useAppStyle from "../../appStyle";
import useStyle from "./profileStyle";
import { NavigationMob } from "../../components/NavigationMob";
import { ProfileCard } from "../../components/ProfileCard";
import {
  getUserProfile,
  handleUserFollow,
  handleUserUnFollow,
} from "./profileSlice";
import { userFollowed, userUnFollowed } from "../auth/authSlice";
import default_img from "../../images/profile.jpg";

export const ProfileLayout = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const {
    profileUser,
    status: profileStatus,
    profileUserFollowing,
    profileUserFollowers,
  } = useSelector((state) => state.profile);
  const { currentUser, userFollowing } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [pageState, setPageState] = useState("posts");

  const followHandler = () => {
    dispatch(
      handleUserFollow({
        currentId: currentUser?._id,
        currentName: currentUser?.name,
        currentUsername: currentUser?.username,
        currentImg: currentUser?.profileImg,
        profileId: profileUser?._id,
      })
    );
  };

  const unfollowHandler = () => {
    dispatch(
      handleUserUnFollow({
        currentId: currentUser?._id,
        currentName: currentUser?.name,
        currentUsername: currentUser?.username,
        currentImg: currentUser?.profileImg,
        profileId: profileUser?._id,
      })
    );
  };

  useEffect(() => {
    profileStatus === "follow_fulfilled" &&
      dispatch(
        userFollowed({
          profile_user_id: profileUser?._id,
          profile_user_name: profileUser?.name,
          profile_user_username: profileUser?.username,
          profile_user_img: profileUser?.profileImg,
        })
      );

    profileStatus === "unfollow_fulfilled" &&
      dispatch(userUnFollowed({ userprofileId: profileUser?._id }));
  }, [
    profileStatus,
    dispatch,
    profileUser?._id,
    profileUser?.name,
    profileUser?.profileImg,
    profileUser?.username,
  ]);

  return profileStatus === "profile_pending" ? (
    <div style={{ textAlign: "center", margin: "2rem auto" }}>
      <CircularProgress className={classes.circularProgress} />
    </div>
  ) : (
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
              onClick={() => navigate("/profile/edit")}
            >
              Edit Profile
            </Button>
          </div>
        )}

        {profileUser?.bio && (
          <Typography
            variant="body1"
            gutterBottom
            style={{ color: "#E2E8F0", padding: "0.5rem" }}
          >
            {profileUser?.bio}
          </Typography>
        )}

        <div className={classes.profileExtras}>
          <div className={classes.profileExtraDiv}>
            <EventIcon className={classes.profileExtraIcon} />
            <Typography className={classes.profileExtraTxt}>Joined:</Typography>
            <Typography className={classes.profileExtraInfo}>
              {`${" "}${profileUser?.createdAt?.split("T")[0]}`}
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

        {profileUser?._id !== currentUser?._id && (
          <div>
            {userFollowing?.find(
              (followingObj) =>
                followingObj?.__follows?._id === profileUser?._id
            ) ? (
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.btnEdit}
                  onClick={unfollowHandler}
                >
                  Unfollow{" "}
                </Button>
                {profileStatus === "pending" && (
                  <CircularProgress className={classes.progressSmall} />
                )}
              </div>
            ) : (
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.btnEdit}
                  onClick={followHandler}
                >
                  Follow{" "}
                </Button>{" "}
                {profileStatus === "pending" && (
                  <CircularProgress className={classes.progressSmall} />
                )}
              </div>
            )}
          </div>
        )}

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

        <div className={classes.profileSectionContent} >
          {pageState === "following" && (
            <div className={classes.flexCol} >
              {profileUserFollowing?.map((followItem) => {
                const userObj = followItem?.__follows;
                return (
                  <div key={followItem?.__follows?._id}>
                    <ProfileCard profileItem={userObj} />
                  </div>
                );
              })}
            </div>
          )}

          {pageState === "followers" && (
            <div className={classes.flexCol}>
              {profileUserFollowers?.map((followItem) => {
                const userObj = followItem?.__user;
                return (
                  <div key={followItem?.__user?._id}>
                    <ProfileCard profileItem={userObj} />
                  </div>
                );
              })}
            </div>
          )}
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
