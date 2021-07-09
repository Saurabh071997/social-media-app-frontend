import { AppBar, Toolbar, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import useStyle from "./feedStyle";
import { getAllPosts } from "./postSlice";
import { PostCard } from "./PostCard";

export const Feed = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { status: postStatus, posts } = useSelector((state) => state.post);
  const { isUserAvailable } = useSelector((state) => state.auth);
  useEffect(() => {
    isUserAvailable && postStatus === "idle" && dispatch(getAllPosts());
  }, [isUserAvailable, postStatus, dispatch]);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar className={classes.navLayout}>
          <Typography align="left" className={classes.pageTitle}>
            Feed
          </Typography>

          {postStatus === "pending" && (
            <CircularProgress size="2rem" className={classes.feedProgress} />
          )}
        </Toolbar>
      </AppBar>

      <div className={classes.flexColRev}>
        {posts?.map((postItem) => {
          return (
            <div key={postItem?._id}>
              <PostCard post={postItem} type="FEED_POST" />
            </div>
          );
        })}
      </div>
      <div style={{ minHeight: "5vh" }}></div>
    </>
  );
};
