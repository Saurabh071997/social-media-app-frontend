import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Container,
  Grid,
} from "@material-ui/core";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import MovieIcon from "@material-ui/icons/Movie";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAppStyle from "../../appStyle";
import useStyle from "./newPostStyle";
import { NavigationMob } from "../../components/NavigationMob";
import { Sidebar } from "../../components/Sidebar";
import { useWindowSize } from "../../utils/useWindowSize";
import { toggleToast } from "../toast/toastSlice";
import {
  validateMediaSize,
  uploadImages,
  uploadVideos,
} from "../../services/post";
import { addNewPost, resetPostStatus } from "./postSlice";

export const NewPostLayout = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { status: postStatus } = useSelector((state) => state.post);

  const [pageError, setPageError] = useState(null);
  const [mediaUploadStatus, setMediaUploadStatus] = useState(null);
  const [postState, setPostState] = useState({
    postContent: null,
    postMedia: [],
  });

  const uploadImgHandler = async (files) => {
    setMediaUploadStatus(true);
    try {
      const imgResponse = await uploadImages(files);
      setPostState((postState) => ({
        ...postState,
        postMedia: [...postState.postMedia, ...imgResponse],
      }));
    } catch (err) {
      dispatch(
        toggleToast({
          toggle: true,
          message: "Failed to upload images. Try later !!",
        })
      );
    } finally {
      setMediaUploadStatus(false);
    }
  };

  const imgHandler = (e) => {
    setPageError(null);
    if (e.target.files.length > 0) {
      const images = e.target.files;
      if (!validateMediaSize(images)) {
        setPageError("MEDIA_SIZE");
      } else {
        uploadImgHandler(e.target.files);
      }
    }
  };

  const uploadVidHandler = async (files) => {
    setMediaUploadStatus(true);
    try {
      const vidResponse = await uploadVideos(files);
      setPostState((postState) => ({
        ...postState,
        postMedia: [...postState.postMedia, ...vidResponse],
      }));
    } catch (err) {
      dispatch(
        toggleToast({
          toggle: true,
          message: "Failed to upload videos. Try later !!",
        })
      );
    } finally {
      setMediaUploadStatus(false);
    }
  };

  const vidHandler = (e) => {
    setPageError(null);
    if (e.target.files.length > 0) {
      const images = e.target.files;
      if (!validateMediaSize(images)) {
        setPageError("MEDIA_SIZE");
      } else {
        uploadVidHandler(e.target.files);
      }
    }
  };

  const postHandler = () => {
    if (!postState?.postContent || postState?.postContent?.length < 2) {
      setPageError("CONTENT_ERROR");
    } else {
      dispatch(
        addNewPost({
          currentId: currentUser?._id,
          currentName: currentUser?.name,
          currentUsername: currentUser?.username,
          currentImg: currentUser?.profileImg,
          content: postState?.postContent,
          media: postState?.postMedia,
        })
      );
    }
  };

  useEffect(() => {
    postStatus === "post_added" && dispatch(resetPostStatus()) && navigate("/");
  }, [postStatus, navigate, dispatch]);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar className={classes.navLayout}>New Post</Toolbar>
      </AppBar>

      <div className={classes.postContainer}>
        <div className={classes.btnPostDiv}>
          <Button
            variant="contained"
            color="primary"
            className={
              postStatus === "pending"
                ? `${classes.btnPost} ${classes.btnPostDisabled}`
                : `${classes.btnPost}`
            }
            onClick={postHandler}
          >
            Post
          </Button>

          {postStatus === "pending" && (
            <div>
              <CircularProgress className={classes.postProgress} />
            </div>
          )}
        </div>

        <textarea
          placeholder="What's on your mind...."
          className={classes.postTxtArea}
          onChange={(e) => {
            setPostState((postState) => ({
              ...postState,
              postContent: e.target.value.trim(),
            }));
            setPageError(null);
          }}
        />

        <div className="post-media-container">
          {postState?.postMedia?.map((mediaItem) => {
            return (
              <div key={mediaItem?.mediaUrl}>
                {mediaItem?.mediaType === "IMAGE" ? (
                  <img
                    src={mediaItem?.mediaUrl}
                    alt="img"
                    className={classes.postMediaItem}
                  />
                ) : (
                  <video
                    controls="controls"
                    src={mediaItem?.mediaUrl}
                    className={classes.postMediaItem}
                  />
                )}
              </div>
            );
          })}
        </div>

        {pageError === "MEDIA_SIZE" && (
          <Typography
            align="center"
            variant="body1"
            style={{ color: "#EF4444" }}
          >
            {`Media Files must be less than 10 mb in size`}
          </Typography>
        )}

        {pageError === "CONTENT_ERROR" && (
          <Typography
            align="center"
            variant="body1"
            style={{ color: "#EF4444" }}
          >
            {`Add something to your post`}
          </Typography>
        )}

        <div className={classes.postMediaBtnDiv}>
          <div className={classes.postMediaInputDiv}>
            <input
              id="upload_img"
              type="file"
              accept="image/*"
              hidden
              multiple="multiple"
              onChange={imgHandler}
            />
            <label htmlFor="upload_img">
              <PhotoLibraryIcon className={classes.postMediaBtn} />
            </label>
          </div>

          <div className={classes.postMediaInputnDiv}>
            <input
              id="upload_vid"
              type="file"
              accept="video/mp4,video/x-m4v,video/*"
              hidden
              multiple="multiple"
              onChange={vidHandler}
            />
            <label htmlFor="upload_vid">
              <MovieIcon className={classes.postMediaBtn} />
            </label>
          </div>
        </div>

        {mediaUploadStatus && (
          <div style={{ textAlign: "center" }}>
            <Typography variant="h5" style={{ color: "#F1F5F9" }}>
              Uploading <CircularProgress className={classes.mediaProgress} />
            </Typography>
          </div>
        )}
      </div>

      <div style={{ height: "30vh" }}></div>
    </>
  );
};

export const NewPostDesktop = () => {
  const classes = useAppStyle();
  return (
    <div className={classes.pageContainer}>
      <Container maxWidth="lg">
        <Grid container direction="row">
          <Grid item className="flex-left">
            <Sidebar />
          </Grid>
          <Grid item className={classes.flexRight}>
            <NewPostLayout />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export const NewPostMob = () => {
  const appStyleClasses = useAppStyle();
  return (
    <div className={appStyleClasses.pageContainer}>
      <NavigationMob />
      <NewPostLayout />
    </div>
  );
};

export const NewPost = () => {
  const [, width] = useWindowSize();
  return width <= 700 ? <NewPostMob /> : <NewPostDesktop />;
};
