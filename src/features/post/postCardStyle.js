import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  flexColRev: {
    display: "flex",
    flexDirection: "column-reverse",
  },

  flexCol: {
    display: "flex",
    flexDirection: "column",
  },

  postCardContainer: {
    display: "flex",
    flexDirection: "column",
    width: "95%",
    border: "0.5px solid #64748B",
    margin: "0.75rem auto 0rem auto",
  },

  postCardHead: {
    display: "flex",
    marginBottom: "0.35rem",
    padding: "0.35rem",
    borderBottom: "0.5px solid #64748B",
  },

  postCardImg: {
    height: "2.5rem",
    width: "2.5rem",
    marginRight: "0.5rem",
    borderRadius: "50%",
    alignSelf: "center",
  },

  postCardUser: {
    display: "flex",
    flexDirection: "column",
    marginRight: "0.5rem",
  },

  postCardUserInfoMain: {
    color: "#F1F5F9",
  },

  postCardUserInfoSub: {
    color: "#94A3B8",
    marginBottom: "0.25rem",
  },

  postCardContent: {
    fontSize: "1.35rem",
    padding: "0rem 0.5rem",
    color: "#F1F5F9",
  },

  postCardMediaItem: {
    height: "240px",
    width: "320px",
    margin: "0rem 0.35rem",
  },

  postCardBtnDiv: {
    display: "flex",
    border: "0.55px solid #64748B",
    padding: "0.35rem",
  },

  postCardBtnItem: {
    display: "flex",
    margin: "0rem 0.5rem",
  },

  postCardBtn: {
    color: "#CBD5E1",
    height: "1.5rem",
    width: "1.5rem",
    cursor: "pointer",
    margin: "0rem 0.25rem",
  },

  postLikeBtn: {
    "&hover": {
      color: "#EF4444",
    },
  },

  postUnlikeBtn: {
    color: "#EF4444",
  },

  postCommentMain: {
    padding: "0.5rem",
    margin: "0.25rem 0rem",
    display: "flex",
    flexDirection: "column",
  },

  postCommentTxtArea: {
    minHeight: "20px",
    padding: "0.25rem",
    fontSize: "1.15rem",
    color: "#F1F5F9",
    background:"transparent",
    border:"none",
    outline:"none"
  },

  postCommentBtn: {
    backgroundColor: "#3B82F6",
    fontSize: "0.75rem",
    "&:hover": {
      backgroundColor: "#3B82F6",
    },
  },

  postCommentDiv: {
    display: "flex",
    flexDirection: "column",
    margin: "0.25rem 0rem",
  },

  postCommentDivUser: {
    display: "flex",
  },

  postCommentImg: {
    height: "1.5rem",
    width: "1.5rem",
    borderRadius: "50%",
    marginRight:"0.25rem"
  },

  postCommentDivTxt:{
    color:"#F1F5F9",
    padding:"0.15rem 1rem",
    marginLeft:"0.5rem"
  },

  commentProgress: {
    color: "#F1F5F9",
    marginLeft:"0.25rem"
  },

}));
