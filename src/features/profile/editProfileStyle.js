import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  navLayout: {
    backgroundColor: "#334155",
    fontSize: "1.5rem",
    color: "#F1F5F9",
    borderBottom: "1px solid #F1F5F9",
  },

  flexCol: {
    display: "flex",
    flexDirection: "column",
  },

  flexRow: {
    display: "flex",
  },

  profileImg: {
    width: "180px",
    height: "180px",
    margin: "0.5rem auto",
    borderRadius: "50%",
  },

  fieldContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "1rem auto",
  },

  inputFields: {
    margin: "1rem auto",
    "&:focused fieldset": {
      borderColor: "green",
    },
  },

  inputFieldTxt: {
    color: "#F1F5F9",
    fontSize: "1.35rem",
  },

  inputFieldLabel: {
    color: "#D1D5DB !important",
  },

  btnSave: {
    fontSize: "1.15rem",
    margin: "0.75rem auto",
    width: "60%",
    backgroundColor: "#0EA5E9",
    "&:hover": {
      backgroundColor: "#0EA5E9",
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },

  uploadIcon: {
    height: "2rem",
    width: "2rem",
    color: "#CBD5E1",
  },

  circularLoader: {
    color:"#F1F5F9"
  }

}));
