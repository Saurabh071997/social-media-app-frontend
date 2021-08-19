import {AppBar, Toolbar, Typography} from '@material-ui/core'
import useStyles from './navigationMainStyle'
import logo_img from '../images/logo.png'

export const NavigationMain = () =>{
    const classes = useStyles()
    return <>
    <AppBar position="sticky">
        <Toolbar style={{padding:'0.5rem 1rem', backgroundColor:"white"}}>
            <img src={logo_img} alt="img" className={classes.navImg}/>

            <Typography className={classes.navTxt} >Vibeum</Typography>
            
        </Toolbar>
    </AppBar>
    </>
}