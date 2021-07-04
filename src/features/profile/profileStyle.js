import {makeStyles} from '@material-ui/core/styles'

export default makeStyles(()=>({
    navLayout: {
        backgroundColor:"#334155",
        fontSize:"1.5rem",
        color:"#F1F5F9",
        borderBottom:"1px solid #F1F5F9",
    },

    componentBlock: {
        marginTop:"1rem",
        display:"flex",
        flexDirection:"column",
        position:"relative" 
    },

    profileImg: {
        height:"5rem",
        width:"5rem",
        borderRadius:"50%",
        margin:"0.5rem"
    },

    flexCol:{
        display:"flex",
        flexDirection:"column"
    },

    profileName:{
        fontSize:"1.75rem",
        color:"#F1F5F9"
    },

    profileUserName:{ 
        fontSize:"1.35rem",
        color:"#CBD5E1",
    },

    btnEdit: {
        backgroundColor:"#3B82F6",
        fontSize:"1rem",
        marginLeft:"1rem",
        margin:"1rem 0.25rem",
        '&:hover':{
            backgroundColor:"#3B82F6"
        }
    },

    profileBio: {
        color:"#E2E8F0",
    },

    profileExtras: {
        marginTop:"0.5rem",
        marginBottom:"1rem",
        display:"flex",
        flexWrap:"wrap"
    },

    profileExtraDiv: {
        display: "flex",
        margin:"0rem 0.5rem"
    },

    profileExtraIcon:{
        height:"1.5rem",
        width:"1.5rem",
        color:"#94A3B8",
        marginRight:"0.15rem"
    },

    profileExtraTxt: {
        fontSize:"1rem",
        color:"#94A3B8",
        marginRight:"0.15rem"
    },

    profileExtraInfo: {
        fontSize:"1rem",
        color:"#CBD5E1"
    }, 

    profileFollowTxt:{
        fontSize:"1.25rem",
        color:"#CBD5E1",
        marginRight:"0.35rem"
    },

    profileFollowCount:{
        fontSize:"1.25rem",
        color:"#3B82F6",
    },

    profileSectionHead:{
        display:"flex",
        borderTop:"1px solid #3B82F6"
    },

    profileSectionHeadTxt:{
        flexGrow:1,
        flexShrink:1,
        fontSize:"1.15rem",
        padding:"0.25rem 0rem", 
        fontWeight:"bold"
    },

    profileSectionContent:{
        margin:"0.75rem 0.25rem"
    },

    circularProgress:{
        height:"3rem",
        width:"3rem",
        color:"#F1F5F9"
    },
    
    progressSmall: {
        color:"#F1F5F9",
        height:"0.5rem",
        width:"0.5rem"
    }

}))