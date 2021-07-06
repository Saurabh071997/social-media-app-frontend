import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  navLayout: {
    backgroundColor: "#334155",
    fontSize: "1.5rem",
    color: "#F1F5F9",
    borderBottom: "1px solid #F1F5F9",
  },

  postContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },

  btnPostDiv: {
    position: "relative",
    padding: "0.5rem",
    margin: "0.25rem 0rem",
    display: "flex",
    flexDirection:"row-reverse",
    justifyContent: "space-between",
  },

  btnPost: {
    backgroundColor: "#3B82F6",
    fontSize: "1.15rem",
    "&:hover": {
      backgroundColor: "#3B82F6",
    },
  },

  btnPostDisabled: {
    pointerEvents:"none"
  },


  postTxtArea: {
    minHeight: "100px",
    width: "80%",
    margin: "0rem 0.5rem",
    border: "none",
    outline: "none",
    background: "transparent",
    color: "#E2E8F0",
    padding: "0.5rem",
    fontSize: "1.35rem",
  },

  postMediaItem: {
    height: "240px",
    width: "320px",
    margin: "0rem 0.35rem",
  },

  postMediaBtnDiv: {
    display: "flex",
    padding: "0.5rem",
    border: "1px solid #94A3B8",
  },

  postMediaInputDiv: {
    display: "flex",
    margin: "0rem 0.5rem",
  },

  postMediaBtn: {
    color: "#CBD5E1",
    height: "2rem",
    width: "2rem",
    cursor: "pointer",
  },

  mediaProgress: {
    color: "#F1F5F9",
  },

  postProgress:{
      color:"#3B82F6"
  }

}));
