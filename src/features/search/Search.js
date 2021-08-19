import { AppBar, Toolbar, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyle from "./searchStyle";
import { useWindowSize } from "../../utils/useWindowSize";
import { searchUsers, resetSearch, getFollowSuggestions } from "./searchSlice";
import { ProfileCard } from "../../components/ProfileCard";
import { ShowDesktopView } from "../../components/ShowDesktopView";
import { ShowMobileView } from "../../components/ShowMobileView";

export const SearchLayout = () => {
  const classes = useStyle();
  const [searchValue, setSearchValue] = useState(null);
  const dispatch = useDispatch();
  const { status, searchedUsers, followSuggestions } = useSelector(
    (state) => state.search
  );

  const { currentUser } = useSelector((state) => state.auth);

  function debounceSearch(callback, delay) {
    let timer;
    return function () {
      let context = this;
      let args = [searchValue];
      clearTimeout(timer);
      timer = setTimeout(() => {
        searchValue?.length >= 1 && dispatch(callback.apply(context, args));
      }, delay);
    };
  }

  const handleSearch = debounceSearch(searchUsers, 500);

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
          onKeyUp={handleSearch}
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
                  if (userItem?._id === currentUser?._id) return null;

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

      {followSuggestions?.length > 0 && (
        <div className={classes.suggestionDiv}>
          <Typography variant="h5" className={classes.successText} gutterBottom>
            Follow Suggestions
          </Typography>

          <div className={classes.flexCol}>
            {followSuggestions?.map((userItem) => {
              return (
                <div key={userItem?._id}>
                  <ProfileCard profileItem={userItem} />
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div style={{ minHeight: "5vh" }}></div>
    </>
  );
};

export const Search = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetSearch());
    // eslint-disable-next-line
  }, []);

  const { isUserAvailable } = useSelector((state) => state.auth);

  useEffect(() => {
    isUserAvailable && dispatch(getFollowSuggestions());
  }, [isUserAvailable, dispatch]);
  const [, width] = useWindowSize();
  return width <= 700 ? (
    <ShowMobileView element={<SearchLayout />} />
  ) : (
    <ShowDesktopView element={<SearchLayout />} />
  );
};
