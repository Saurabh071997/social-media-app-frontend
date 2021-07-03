import { AppBar, Toolbar, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAppStyle from "../../appStyle";
import useStyle from "./searchStyle";
import { NavigationMob } from "../../components/NavigationMob";
import { useWindowSize } from "../../utils/useWindowSize";
import { searchUsers, resetSearch } from "./searchSlice";
import { ProfileCard } from "../../components/ProfileCard";

export const SearchLayout = () => {
  const classes = useStyle();
  const [searchValue, setSearchValue] = useState(null);
  const dispatch = useDispatch();
  const { status, searchedUsers } = useSelector((state) => state.search);
  return (
    <>
      <AppBar position="sticky">
        <Toolbar className={classes.navLayout}>Search</Toolbar>
      </AppBar>

      <div className={classes.searchDiv}>
        <SearchIcon
          className={classes.searchIcon}
          onClick={() => {
            searchValue?.length >= 1 && dispatch(searchUsers(searchValue));
          }}
        />
        <input
          type="text"
          placeholder="Search User by name"
          className={classes.inputTag}
          onChange={(e) => {
            setSearchValue(e.target.value.trim());
          }}
        />
      </div>

      {status === "pending" && (
        <div style={{ textAlign: "center" }}>
          <CircularProgress className={classes.progressBar} />
        </div>
      )}

      <div className={classes.resultDiv}>
        {status === "fulfilled" && (
          <div>
            {searchedUsers?.length > 0 ? (
              <div className={classes.flexCol}>
                <Typography variant="h5" className={classes.successText}>
                  Based on Search Result
                </Typography>
                {searchedUsers.map((userItem) => {
                  return (
                    <div key={userItem?._id}>
                      <ProfileCard profileItem={userItem} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>
                <Typography
                  variant="h5"
                  gutterBottom
                  align="center"
                  className={classes.failText}
                >
                  No user exist for "{searchValue}"
                </Typography>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export const SearchDesktop = () => {
  return <></>;
};

export const SearchMob = () => {
  const appStyleClasses = useAppStyle();
  return (
    <div className={appStyleClasses.pageContainer}>
      <NavigationMob />
      <SearchLayout />
    </div>
  );
};

export const Search = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetSearch());
    // eslint-disable-next-line
  }, []);
  const [, width] = useWindowSize();
  return width <= 600 ? <SearchMob /> : <SearchDesktop />;
};
