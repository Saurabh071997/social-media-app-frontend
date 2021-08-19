import { useWindowSize } from "../utils/useWindowSize";
import { Feed } from "../features/post/Feed";
import { ShowMobileView } from "./ShowMobileView";
import { ShowDesktopView } from "./ShowDesktopView";

export const Home = () => {
  const [, width] = useWindowSize();
  return width <= 700 ? (
    <ShowMobileView element={<Feed />} />
  ) : (
    <ShowDesktopView element={<Feed />} />
  );
};
