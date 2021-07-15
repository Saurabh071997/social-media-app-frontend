import { Typography, Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import useStyle from "./postCardStyle";
import default_img from "../../images/profile.jpg";
import { handleLikePost, handleUnlikePost, addPostComment } from "./postSlice";
import {
  likeUserPost,
  unlikeUserPost,
  commentUserPost,
} from "../profile/profileSlice";

export const PostCard = ({ post, type }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { status: postStatus } = useSelector((state) => state.post);
  const postTime = moment(post?.createdAt).fromNow();
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [error, setError] = useState(false);

  const likeHandler = () => {
    if (type === "FEED_POST") {
      dispatch(handleLikePost(post?._id));
    } else {
      dispatch(likeUserPost(post?._id));
    }
  };

  const unlikeHandler = () => {
    if (type === "FEED_POST") {
      dispatch(handleUnlikePost(post?._id));
    } else {
      dispatch(unlikeUserPost(post?._id));
    }
  };

  const CommentModal = () => {
    const [comment, setComment] = useState(null);
    const commentHandler = () => {
      if (!comment || comment?.length < 1) {
        setError(true);
      } else {
        if (type === "FEED_POST") {
          dispatch(
            addPostComment({
              postId: post?._id,
              comment,
            })
          );
        } else {
          dispatch(
            commentUserPost({
              postId: post?._id,
              comment,
            })
          );
        }
      }
    };

    return (
      <>
        <div className={classes.flexCol} style={{ padding: "0rem 0.5rem" }}>
          <div className={classes.postCommentMain}>
            <textarea
              placeholder="Add a comment"
              className={classes.postCommentTxtArea}
              onChange={(e) => {
                setComment(e.target.value.trim());
                setError(false);
              }}
            />
            <div style={{ textAlign: "left", display: "flex" }}>
              <Button
                variant="contained"
                color="primary"
                className={classes.postCommentBtn}
                onClick={commentHandler}
              >
                Add Comment
              </Button>
              {postStatus === "comment_pending" && (
                <CircularProgress
                  size="2rem"
                  className={classes.commentProgress}
                />
              )}
            </div>

            {error && (
              <Typography
                align="center"
                variant="body2"
                style={{ color: "#EF4444" }}
              >
                {`Write something !!`}
              </Typography>
            )}
          </div>
          <div className="post-comment-sub">
            {post?.comments?.map((item) => {
              return (
                <div key={item?._id} className={classes.postCommentDiv}>
                  <div className={classes.postCommentDivUser}>
                    <img
                      src={
                        item?.commentBy?.profileImg
                          ? item?.commentBy?.profileImg
                          : default_img
                      }
                      alt="img"
                      className={classes.postCommentImg}
                    />

                    <Typography
                      variant="body1"
                      style={{ color: "#F1F5F9", marginRight: "0.2rem" }}
                    >
                      {item?.commentBy?.name}
                    </Typography>
                    <Typography variant="body2" style={{ color: "#94A3B8" }}>
                      @{item?.commentBy?.username}
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      variant="subtitle2"
                      className={classes.postCommentDivTxt}
                    >
                      {item?.comment}
                    </Typography>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className={classes.postCardContainer}>
        <div className={classes.postCardHead}>
          <img
            src={
              post?.__userId?.profileImg
                ? post?.__userId?.profileImg
                : default_img
            }
            alt="img"
            className={classes.postCardImg}
          />
          <div className={classes.postCardUser}>
            <Typography
              align="left"
              variant="subtitle1"
              className={classes.postCardUserInfoMain}
            >
              {post?.__userId?.name}
            </Typography>
            <Typography
              align="left"
              variant="body2"
              className={classes.postCardUserInfoSub}
            >
              @{post?.__userId?.username}
            </Typography>
          </div>
          <Typography
            variant="subtitle2"
            className={classes.postCardUserInfoSub}
            style={{
              alignSelf: "flex-start",
              position: "relative",
              top: "0.5em",
            }}
          >
            {postTime}
          </Typography>
        </div>
        <div className={classes.flexCol}>
          <Typography className={classes.postCardContent} gutterBottom>
            {post?.content}
          </Typography>

          <div className="post-media-container">
            {post?.media?.map((mediaItem) => {
              return (
                <div key={mediaItem?._id} >
                  {mediaItem?.mediaType === "IMAGE" ? (
                    <img
                      src={mediaItem?.mediaUrl}
                      alt="img"
                      className={classes.postCardMediaItem}
                    />
                  ) : (
                    <video
                      src={mediaItem?.mediaUrl}
                      controls="controls"
                      className={classes.postCardMediaItemVid}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className={classes.postCardBtnDiv}>
          <div className={classes.postCardBtnItem}>
            {post?.likedBy?.find(
              (item) => item?.likeduser === currentUser?._id
            ) ? (
              <FavoriteIcon
                className={`${classes.postCardBtn} ${classes.postUnlikeBtn}`}
                onClick={unlikeHandler}
              />
            ) : (
              <FavoriteIcon
                className={`${classes.postCardBtn} ${classes.postLikeBtn}`}
                onClick={likeHandler}
              />
            )}

            <Typography variant="body1" style={{ color: "#F1F5F9" }}>
              {post?.likes > 0 && post?.likes}
            </Typography>
          </div>

          <div className={classes.postCardBtnItem}>
            <CommentIcon
              className={classes.postCardBtn}
              onClick={() => {
                setShowCommentModal((showCommentModal) => !showCommentModal);
              }}
            />
          </div>
        </div>
        {showCommentModal && <CommentModal />}
      </div>
    </>
  );
};
