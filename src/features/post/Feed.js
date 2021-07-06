import { AppBar, Toolbar } from "@material-ui/core";
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
  const { status: authStatus } = useSelector((state) => state.auth);
  useEffect(() => {
    authStatus === "user_available" &&
      postStatus === "idle" &&
      dispatch(getAllPosts());
  }, [authStatus, postStatus, dispatch]);

  return postStatus === "pending" ? (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <CircularProgress className={classes.feedProgress} />
    </div>
  ) : (
    <>
      <AppBar position="sticky">
        <Toolbar className={classes.navLayout}>Feed</Toolbar>
      </AppBar>

      <div className={classes.flexColRev}>
        {posts?.map((postItem) => {
          return (
            <div key={postItem?._id}>
              <PostCard post={postItem} type="FEED_POST"/>
            </div>
          );
        })}
      </div>
      <div style={{ minHeight: "30vh" }}></div>
    </>
  );
};
