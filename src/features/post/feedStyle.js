import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  navLayout: {
    backgroundColor: "#334155",
    disply: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #F1F5F9",
  },

  pageTitle: {
    fontSize: "1.5rem",
    color: "#F1F5F9",
  },

  flexColRev: {
    display: "flex",
    flexDirection: "column-reverse",
  },

  feedProgress: {
    color: "#F1F5F9",
  },

  flexCol: {
    display: "flex",
    flexDirection: "column",
  },

}));
