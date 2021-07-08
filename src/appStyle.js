import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  pageContainer: {
    minHeight: "100vh",
    backgroundColor: "#334155",
  },

  displayFlex: {
    display: "flex",
  },

  flexLeft: {
    // backgroundColor: "green",
    width: "25%",
    flexShrink: 1,
    height: "90vh",
    position: "sticky",
    top: "0rem",
    overflow: "auto",
  },

  flexRight: {
    width: "50%",
    minHeight:"100vh",
    flexShrink: 1,
    borderLeft: "0.65px solid #0891B2",
    borderRight: "0.65px solid #0891B2",
  },

  sidebarImg: {
    height: "3rem",
    width: "3rem",
    margin: "1rem 1rem 2rem 1rem",
  },

  sidebarNavBtn: {
    width: "80%",
    margin: "0rem 1rem",
    display: "flex",
    justifyContent: "space-between",
    // textAlign: "left",
    // color:"white",
    boxShadow: "none",
    backgroundColor: "#334155",
    "&:hover": {
      backgroundColor: "#1E293B",
    },
  },

  sideText: {
    flexGrow: 1,
    fontSize: "1.25rem",
    fontWeight: "bold",
  },

  sideIcon: {
    alignSelf: "flex-start",
  },

  btnCreate: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    width: "80%",
    margin: "2rem 1rem",
    backgroundColor: "#0EA5E9",
    "&:hover": {
      backgroundColor: "#0EA5E9",
    },
  },

  sidebarProfileImg: {
    height: "2rem",
    width: "2rem",
    borderRadius: "50%",
    alignSelf: "center",
  },

  sidebarProfileBtn: {
    padding: "0.25rem 1rem",
    // width: "50%",
    // maxWidth:"80%",
    margin: "0rem 1rem",
    display: "flex",
    border: "0.5px solid #0284C7",
    borderRadius: "1.5rem",
    backgroundColor: "#334155",
    "&:hover": {
      backgroundColor: "#1E293B",
    },
  },

  sidebarProfileTxt: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "0.5rem",
    textAlign: "left",
  },

  navMob: {
    padding: "0rem",
    margin: "0rem",
  },

  navMobTop: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.5rem 1rem",
    backgroundColor: "#1E293B",
  },

  navMobImg: {
    height: "2.5rem",
    width: "2.5rem",
  },

  navMobIcon: {
    height: "2rem",
    width: "2rem",
    color: "white",
  },

  navMobBottom: {
    width: "100%",
    position: "fixed",
    bottom: "0em",
    display: "flex",
    justifyContent: "space-between",
    padding: "0.25rem",
    zIndex: 10,
    backgroundColor: "#1E293B",
  },

  navModal: {
    width: "100%",
    display: "flex",
    padding: "1rem ",
    flexDirection: "column",
    position: "fixed",
    bottom: "4em",
    zIndex: 10,
    backgroundColor: "#1E293B",
  },

  sidebarDivTxt: {
    color: "white",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },

  sidebarDivIcon: {
    color: "white",
    height: "2rem",
    width: "2rem",
    marginRight: "1rem",
  },
}));

// sidebarImg: {
//   height: "4rem",
//   width: "4rem",
//   margin: "1rem 1rem 2rem 1rem",
// },

// sidebar: {
//   display: "inline-block",
//   width: "70%",
//   position: "absolute",
//   right: "1em",
//   padding: "0.5rem",
//   height: "90%",
// },

// sidebarDiv: {
//   display: "flex",
//   padding: "0.5rem",
//   width: "90%",
//   cursor: "pointer",
//   "&:hover": {
//     backgroundColor: "#3B82F6",
//     borderRadius: "0.25rem",
//   },
// },

// sidebarDivTxt: {
//   color: "white",
//   fontSize: "1.5rem",
//   fontWeight: "bold",
// },

// sidebarDivIcon: {
//   color: "white",
//   height: "2rem",
//   width: "2rem",
//   marginRight: "1rem",
// },

// btnNewPost: {
//   backgroundColor: "#3B82F6",
//   textAlign: "center",
//   width: "80%",
//   "&:hover": {
//     backgroundColor: "#3B82F6",
//   },
// },

// sidebarProfileDiv: {
//   display: "flex",
//   border: "1px solid #0284C7",
//   borderRadius: "1.25rem",
//   padding: "0.5rem 1.25rem",
//   cursor: "pointer",
//   margin: "0.25rem 0rem",
// },

// sidebarProfileImg: {
//   height: "2.5rem",
//   width: "2.5rem",
//   borderRadius: "50%",
//   marginRight: "1rem",
// },

// sidebarProfileTxt: {
//   display: "flex",
//   flexDirection: "column",
// },

// sidebarProfileTxtMain: {
//   fontSize: "1.25rem",
//   color: "#A3A3A3",
//   marginBottom: "0.25rem",
//   textOverflow: "ellipsis",
// },

// sidebarProfileTxtSub: {
//   fontSize: "1rem",
//   color: "#737373",
//   textOverflow: "ellipsis",
// },

// logoutDiv: {
//   display: "flex",
//   padding: "1rem 0.5rem",
//   backgroundColor: "#D4D4D4",
//   cursor: "pointer",
// },
