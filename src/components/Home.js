import { useWindowSize } from "../utils/useWindowSize";
import useAppStyle from "../appStyle";
import { NavigationMob } from "./NavigationMob";
import { Sidebar } from "./Sidebar";
import { Feed } from "../features/post/Feed";

export const MobileHome = () => {
  const classes = useAppStyle();

  return (
    <div className={classes.pageContainer}>
      <NavigationMob />
      <Feed/>
    </div>
  );
};

export const DesktopHome = () => {
  const classes = useAppStyle();
  return (
    <div className={classes.pageContainer}>
      <div style={{ display: "flex", position: "relative" }}>
        <div
          style={{
            position: "fixed",
            top: "0em",
            width: "30%",
            borderRight: "1px solid #E2E8F0",
            minHeight: "100vh",
          }}
        >
          <Sidebar />
        </div>
        <div
          style={{
            width: "40%",
            marginLeft: "30%",
            backgroundColor: "red",
            height: "200vh",
          }}
        ></div>
        <div style={{ position: "sticky", top: "0.5em", width: "30%" }}></div>
      </div>
    </div>
  );
};

export const Home = () => {
  const [, width] = useWindowSize();
  return width <= 600 ? <MobileHome /> : <DesktopHome />;
};
