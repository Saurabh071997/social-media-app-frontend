import { Container, Grid } from "@material-ui/core";
import { Sidebar } from "./Sidebar";
import useAppStyle from "../appStyle";

export const ShowDesktopView = (props) => {
  const classes = useAppStyle();
  return (
    <div className={classes.pageContainer}>
      <Container maxWidth="md" style={{ padding: "0rem" }}>
        <Grid container direction="row">
          <Grid item className="flex-left">
            <Sidebar />
          </Grid>
          <Grid item className={classes.flexRight}>
            {props.element}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
