import useAppStyle from "../appStyle";
import { NavigationMob } from "./NavigationMob";

export const ShowMobileView = (props) => {
  const classes = useAppStyle();

  return (
    <div className={classes.pageContainer}>
      <NavigationMob />
      {props.element}
    </div>
  );
};
