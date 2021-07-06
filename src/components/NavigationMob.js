import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Typography, AppBar, Toolbar, IconButton } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PersonIcon from "@material-ui/icons/Person";
import CreateIcon from "@material-ui/icons/Create";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SearchIcon from "@material-ui/icons/Search";
import useAppStyle from "../appStyle";
import app_img from "../images/icon.gif";
import { useState } from "react";
import {logoutUser} from '../features/auth/authSlice'


export const NavigationMob = () => {
  const classes = useAppStyle();
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const Modal = () => {
    return (
      <div className={classes.navModal}>
        <div
          style={{ display: "flex" }}
          onClick={() => navigate(`/profile/view/${currentUser?._id}`)}
        >
          <PersonIcon
            className={classes.sidebarDivIcon}
            style={{ color: "#0EA5E9" }}
          />
          <Typography
            className={classes.sidebarDivTxt}
            style={{ color: "#0EA5E9" }}
          >
            My Profile
          </Typography>
        </div>

        <div style={{ display: "flex" }} onClick={()=>{
          dispatch(logoutUser())
          navigate('/welcome')
        }}>
          <ExitToAppIcon
            className={classes.sidebarDivIcon}
            style={{ color: "#EF4444" }}
          />
          <Typography
            className={classes.sidebarDivTxt}
            style={{ color: "#EF4444" }}
          >
            Logout
          </Typography>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.navMob}>
      <AppBar position="sticky">
        <Toolbar className={classes.navMobTop}>
          <img src={app_img} alt="img" className={classes.navMobImg} />
          <IconButton onClick={()=>navigate('/post/new')}>
            <CreateIcon className={classes.navMobIcon} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {showModal && <Modal />}

      <div className={classes.navMobBottom}>
        <IconButton onClick={()=> navigate('/')}>
          <HomeIcon className={classes.navMobIcon} />
        </IconButton>
        <IconButton onClick={()=> navigate('/search')}>
          <SearchIcon className={classes.navMobIcon} />
        </IconButton>
        <IconButton>
          <NotificationsIcon className={classes.navMobIcon} />
        </IconButton>
        <IconButton
          onClick={() => {
            setShowModal((showModal) => !showModal);
          }}
        >
          <PersonIcon className={classes.navMobIcon} />
        </IconButton>
      </div>
    </div>
  );
};
