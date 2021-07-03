import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  pageBlock: {
    width: "auto",
    margin: "1rem 0rem",
    minHeight: "100vh"
  },

  pageTitle: {
    fontSize: "3rem",
    margin: "auto",
    // color: "#1E40AF",
    color:"#475569",
    fontWeight: "bold"
  },

  credentialsContainer: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
  },

  inputFields: {
    margin: "0.5rem auto",
    '&:focus':{
      borderColor:"#475569"
    }
  },

  btnLogin: {
    fontSize: "1.15rem",
    margin: "0.75rem auto",
    width: "60%",
    backgroundColor:"#1E293B",
    '&:hover':{
        backgroundColor:"#1E293B"
    },
    [theme.breakpoints.down('sm')]:{
      width:"90%"
    }
  },

  btnDisabled:{
    pointerEvents:"none"
  },

  navText: {
    fontSize: "1.25rem",
    color: "#0284C7",
    fontWeight:"bold"
  },

  linkText:{
      color:"black",
      '&:hover':{
          textDecoration:'underline'
      }
  }
}));
