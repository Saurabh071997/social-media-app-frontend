import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  pageMain: {
    minHeight: "100vh",
    display: "flex",
    [theme.breakpoints.down('sm')]: {
      flexDirection:'column'
    },
  },

  pageSub: {
    width: "50%",
    position:'relative',
    [theme.breakpoints.down('sm')]:{
      minHeight:'50vh',
      width:'auto'
    }
  },

  containerCenter: {
    position: "absolute",
    top: '40%',
    left:'50%',
    msTransform:'translate(-50%, -50%)',
    transform:'translate(-50%,-50%)',
    [theme.breakpoints.down('sm')]:{
      top:'50%',
    }
  },

  pageImg: {
    width:'100%',
    textAlign:"center",
    [theme.breakpoints.down('sm')]:{
      width:'auto'
    }
  },

  pageIcon: {
    height: "20rem",
    width: "20rem",
    [theme.breakpoints.down('sm')]:{
      height:"10rem",
      width:"10rem"
    }
  },

  appName:{
    fontSize:'6rem',
    margin:'1rem auto',
    color:"white",
    [theme.breakpoints.down('sm')]:{
      fontSize:"3rem"
    }
  },

  pageNav:{
    width:'100%',
  },

  msgMain:{
    fontSize:"3.5rem",
    // color:'#2563EB',
    color:"#475569",
    margin: '1rem',
    fontWeight:"bold",
    [theme.breakpoints.down('sm')]:{
      fontSize:"3rem"
    }
  },

  msgSub: {
    fontSize:'2.35rem',
    margin:'0.75rem 1rem',
    fontWeight:"bold",
    // color:"#2563EB",
    color:"#475569",
    [theme.breakpoints.down('sm')]:{
      fontSize:'1.7rem'
    }
  },

  btnContainer:{
    display:"flex",
    flexDirection:"column",
    margin:'1rem',
    [theme.breakpoints.down('sm')]:{
      margin: '1rem 0.25rem'
    }
  },

  btnNav: {
    width:"100%",
    fontSize:"1.35rem",
    margin:"0.5rem 0rem",
    backgroundColor:"#1E293B",
    '&:hover':{
      backgroundColor:"#1E293B"
    },
    [theme.breakpoints.down('sm')]:{
      fontSize:"1.25rem"
    }
  }

}));
