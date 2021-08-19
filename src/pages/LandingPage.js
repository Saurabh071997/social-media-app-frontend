import { Container, Typography, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import useStyle from "./landingPageStyle";
import main_icon from "../images/icon.gif";

export const LandingPage = () => {
  const classes = useStyle();
  const navigate = useNavigate();
  return (
    <div className={classes.pageMain}>
      <div className={classes.pageSub} style={{ backgroundColor: "#334155" }}>
        <Container className={`${classes.containerCenter} ${classes.pageImg}`}>
          <img src={main_icon} className={classes.pageIcon} alt="img" />
          <Typography className={classes.appName}>Vibeum</Typography>
        </Container>
      </div>
      <div className={classes.pageSub}>
        <Container className={`${classes.containerCenter} ${classes.pageNav}`}>
          <Typography className={classes.msgMain} gutterBottom>
            What's happening ??
          </Typography>
          <Typography className={classes.msgSub} gutterBottom>
            Join Vibeum Today
          </Typography>

          <Container maxWidth="xs" className={classes.btnContainer}>
            <Button
              variant="contained"
              color="primary"
              className={classes.btnNav}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.btnNav}
              onClick={() => {
                navigate("/signup");
              }}
            >
              Signup
            </Button>
          </Container>
        </Container>
      </div>
    </div>
  );
};
