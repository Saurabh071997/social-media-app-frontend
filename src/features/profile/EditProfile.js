import {
  AppBar,
  Toolbar,
  Container,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "../../utils/useWindowSize";
import useAppStyle from "../../appStyle";
import useStyle from "./editProfileStyle";
import { NavigationMob } from "../../components/NavigationMob";
import default_img from "../../images/profile.jpg";
import { updateUserProfile } from "./profileSlice";
import { toggleToast } from "../toast/toastSlice";
import { uploadProfileImg } from "../../services/profile";

export const EditProfileLayout = () => {
  const [, width] = useWindowSize();
  const classes = useStyle();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { currentUser } = useSelector((state) => state.auth);
  const { status: profileStatus, profileUser } = useSelector(
    (state) => state.profile
  );
  const [uploadStatus, setuploadStatus] = useState(false);
  const [pageError, setPageError] = useState(null);
  const [pageState, setPageState] = useState({
    name: profileUser?.name ? profileUser?.name : null,
    username: profileUser?.username ? profileUser?.username : null,
    profileImg: profileUser?.profileImg ? profileUser?.profileImg : null,
    bio: profileUser?.bio ? profileUser?.bio : null,
    location: profileUser?.location ? profileUser?.location : null,
  });

  useEffect(() => {
    if (profileStatus === "updated") {
      dispatch(toggleToast({ toggle: true, message: "Profile Updated !!" }));
      navigate(`/profile/view/${profileUser?._id}`);
    }
    if (profileStatus === "error_409") {
      dispatch(
        toggleToast({ toggle: true, message: `Username already exists!!` })
      );
    }
  }, [profileStatus, dispatch, navigate, profileUser?._id]);

  const imageHandler = async (file) => {
    setuploadStatus(true);
    try {
      const response = await uploadProfileImg(file);
      setPageState((pageState) => ({
        ...pageState,
        profileImg: response?.url,
      }));
    } catch (err) {
      dispatch(
        toggleToast({
          toggle: true,
          message: "Failed to upload image. Try later !!",
        })
      );
    } finally {
      setuploadStatus(false);
    }
  };

  const uploadHandler = (e) => {
    if (e.target.files.length === 1) {
      let file = e.target.files[0];
      if (file.size / (1024 * 1024) > 5) {
        setPageError("IMAGE_SIZE");
      } else {
        imageHandler(file);
      }
    }
  };

  const validateProfile = () => {
    let usernameregex = /^[a-zA-Z0-9_#$]+$/;
    if (!usernameregex.test(pageState?.username)) {
      setPageError("USERNAME_FORMAT");
      return false;
    }
    return true;
  };

  const updateHandler = () => {
    validateProfile() &&
    dispatch(
      updateUserProfile({
        name: pageState?.name,
        username: pageState?.username,
        profileImg: pageState?.profileImg,
        bio: pageState?.bio,
        location: pageState?.location,
      })
    );
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar className={classes.navLayout}>Update Profile</Toolbar>
      </AppBar>

      <div className={classes.flexCol}>
        <div style={{ textAlign: "center" }}>
          <img
            src={pageState?.profileImg ? pageState?.profileImg : default_img}
            alt="img"
            className={classes.profileImg}
          />
          <div
            style={{
              margin: "0.25rem auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <input
              id="upload_img"
              type="file"
              accept=".png, .jpg, .jpeg"
              hidden
              onChange={uploadHandler}
            />
            <div>
              <label htmlFor="upload_img">
                <ImageIcon className={classes.uploadIcon} />
              </label>
            </div>
          </div>

          {pageError === "IMAGE_SIZE" && (
            <Typography
              align="center"
              variant="body1"
              style={{ color: "#EF4444" }}
            >
              {`Image must be less than 5 mb`}
            </Typography>
          )}
          {uploadStatus && (
            <CircularProgress className={classes.circularLoader} />
          )}
        </div>

        <Container maxWidth="sm" className={classes.fieldContainer}>
          <TextField
            label="Name"
            defaultValue={profileUser?.name}
            className={classes.inputFields}
            style={{ width: width < 600 ? "100%" : "60%" }}
            InputLabelProps={{
              classes: {
                root: classes.inputFieldLabel,
                focused: classes.inputFieldLabel,
              },
            }}
            InputProps={{
              classes: {
                root: classes.inputFieldTxt,
                focused: classes.inputFieldTxt,
              },
            }}
            onChange={(e) => {
              setPageState((pageState) => ({
                ...pageState,
                name: e.target.value.trim(),
              }));
            }}
          />

          <TextField
            label="Username"
            defaultValue={profileUser?.username}
            className={classes.inputFields}
            style={{ width: width < 600 ? "100%" : "60%" }}
            InputLabelProps={{
              classes: {
                root: classes.inputFieldLabel,
                focused: classes.inputFieldLabel,
              },
            }}
            InputProps={{
              classes: {
                root: classes.inputFieldTxt,
                focused: classes.inputFieldTxt,
              },
            }}
            onChange={(e) => {
              setPageState((pageState) => ({
                ...pageState,
                username: e.target.value.trim(),
              }));
              setPageError(null);
            }}
          />

          {pageError === "USERNAME_FORMAT" && (
            <Typography
              align="center"
              variant="body1"
              style={{ color: "#EF4444" }}
            >
              {`Username can only be alphanumeric with _, # and $ allowed`}
            </Typography>
          )}

          <TextField
            label="Bio"
            multiline
            rows={4}
            defaultValue={profileUser?.bio}
            className={classes.inputFields}
            style={{ width: width < 600 ? "100%" : "60%" }}
            InputLabelProps={{
              classes: {
                root: classes.inputFieldLabel,
                focused: classes.inputFieldLabel,
              },
            }}
            InputProps={{
              classes: {
                root: classes.inputFieldTxt,
                focused: classes.inputFieldTxt,
              },
            }}
            onChange={(e) => {
              setPageState((pageState) => ({
                ...pageState,
                bio: e.target.value.trim(),
              }));
            }}
          />

          <TextField
            label="Location"
            defaultValue={profileUser?.location}
            className={classes.inputFields}
            style={{ width: width < 600 ? "100%" : "60%" }}
            InputLabelProps={{
              classes: {
                root: classes.inputFieldLabel,
                focused: classes.inputFieldLabel,
              },
            }}
            InputProps={{
              classes: {
                root: classes.inputFieldTxt,
                focused: classes.inputFieldTxt,
              },
            }}
            onChange={(e) => {
              setPageState((pageState) => ({
                ...pageState,
                location: e.target.value.trim(),
              }));
            }}
          />

          <Button
            variant="contained"
            color="primary"
            className={classes.btnSave}
            onClick={updateHandler}
          >
            Save
          </Button>
        </Container>
        <div style={{ height: "30vh" }}></div>
      </div>
    </>
  );
};

export const EditProfileDesktop = () => {
  return <></>;
};

export const EditProfileMob = () => {
  const appStyleClasses = useAppStyle();
  return (
    <div className={appStyleClasses.pageContainer}>
      <NavigationMob />
      <EditProfileLayout />
    </div>
  );
};

export const EditProfile = () => {
  const [, width] = useWindowSize();
  return width < 600 ? <EditProfileMob /> : <EditProfileDesktop />;
};
