import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  profileCard: {
    display: "flex",
    padding: "0.5rem 1rem",
    borderBottom: "1px solid #94A3B8",
  },

  profileCardImg: {
    height: "4rem",
    width: "4rem",
    marginRight: "0.5rem",
    borderRadius: "50%",
  },

  profileCardTxt: {
    display: "flex",
    flexDirection: "column",
  },

  profileCardName: {
    fontSize: "1.5rem",
    color: "#F1F5F9",
  },

  profileCardUsername: {
    fontSize: "1.25rem",
    color: "#CBD5E1",
  },
}));
