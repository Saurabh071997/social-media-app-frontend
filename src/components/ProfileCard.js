import { Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import useStyle from "./profileCardStyle";
import default_img from "../images/profile.jpg";

export const ProfileCard = ({ profileItem }) => {
  const classes = useStyle();
  const navigate = useNavigate();
  return (
    <div
      className={classes.profileCard}
      onClick={() => navigate(`/profile/view/${profileItem?._id}`)}
    >
      <img
        src={profileItem?.profileImg ? profileItem?.profileImg : default_img}
        alt="img"
        className={classes.profileCardImg}
      />
      <div className={classes.profileCardTxt}>
        <Typography variant="h5" className={classes.profileCardName}>
          {profileItem?.name}
        </Typography>
        <Typography variant="body1" className={classes.profileCardUsername}>
          @{profileItem?.username}
        </Typography>
      </div>
    </div>
  );
};
