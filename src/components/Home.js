import { useWindowSize } from "../utils/useWindowSize";
import useAppStyle from "../appStyle";
import { NavigationMob } from "./NavigationMob";
import { Sidebar } from './Sidebar'
import { Feed } from "../features/post/Feed";
import { Container, Grid } from "@material-ui/core";

export const MobileHome = () => {
  const classes = useAppStyle();

  return (
    <div className={classes.pageContainer}>
      <NavigationMob />
      <Feed />
    </div>
  );
};

export const DesktopHome = () => {
  const classes = useAppStyle();
  return (
    <div className={classes.pageContainer}>
      <Container maxWidth="md" style={{padding:"0rem"}}>
        <Grid container direction="row" >
          <Grid item className="flex-left">
            <Sidebar/>
          </Grid>
          <Grid item className={classes.flexRight}>
            <Feed/>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export const Home = () => {
  const [, width] = useWindowSize();
  return width <= 700 ? <MobileHome /> : <DesktopHome />;
};


