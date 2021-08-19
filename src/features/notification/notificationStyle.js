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

  pageProgress: {
    color: "#F1F5F9",
  },

  btnRead: {
    backgroundColor: "#3B82F6",
    fontSize: "0.75rem",
    "&:hover": {
      backgroundColor: "#3B82F6",
    },
  },

  notifyDiv: {
    display: "flex",
    padding:"0.5rem",
    // width:"90%",
    border:"0.5px solid #7DD3FC",
    marginBottom:"0.5rem"
  },

  notifyDivIcon:{
      width:"3rem",
      padding:"0.15rem",
      marginRight:"0.25rem",
      textAlign:"center",
  },

  notifyIcon:{  
      height:"2.25rem",
      width:"2.25rem",
  },

  colorRead:{
    color:"#0EA5E9",
  },

  colorUnRead:{
    color:"#FBBF24"
  },

  notifyDivContent:{
    display:"flex",
    flexDirection:"column",
    padding:"0.25rem"
  },

  notifyUserImg:{
    height:"2rem",
    width:"2rem",
    borderRadius:"50%",
    marginRight:"0.25rem"
  },

  notifyMsg:{
      fontSize:"1rem",
      color:"#E2E8F0"
  },

  notifyUser:{
      fontWeight:"bold",
      color:"#3B82F6",
      fontSize:"1.25rem",
      marginRight:"0.2rem",
      cursor:"pointer",
      '&:hover':{
        textDecoration:"underline"
      }
  },

  notifyPost:{
      color:"#94A3B8",
      margin: "0.75rem 0rem 0.25rem 0rem" 
  }

}));
