import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  navLayout: {
    backgroundColor: "#334155",
    fontSize: "1.5rem",
    color: "#F1F5F9",
    borderBottom: "1px solid #F1F5F9",
  },

  searchDiv: {
    margin: "0.5rem auto",
    display: "flex",
    padding: "0.5rem 0.2rem",
  },

  searchIcon: {
    height: "2.2rem",
    width: "2.2rem",
    color: "#E2E8F0",
    cursor: "pointer",
    margin: "0rem 0.2rem",
  },

  inputTag: {
    padding: "0.5rem 0.25rem",
    fontSize: "1.25rem",
    width: "80%",
    border: "1px solid #94A3B8",
    background: "transparent",
    borderRadius: "0.25rem",
    color: "#F1F5F9",
    outline: "none",
  },

  progressBar: {
    color: "#F1F5F9",
    margin: "0.5rem auto",
  },

  flexCol:{
      display:"flex",
      flexDirection:"column"
  },

  resultDiv: {
    margin: "1rem auto",
    display: "flex",
    flexDirection: "column",
  },

  successText:{
    color:"#3B82F6",
    padding:"0rem 1rem",
    marginBottom:"0.75rem"
  },

  failText: {
      color:"#94A3B8"
  },

}));
