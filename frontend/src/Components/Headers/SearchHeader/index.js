import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Navbar from "./Navbar";
import { AppBar } from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import Search from "../../Search";
import MultiSelect from "../../MultiSelect";
import { withRouter } from "react-router-dom";
import { searchAction } from "../../../store/actions/searchAction";

const useStyles = makeStyles(theme => ({
  searchbar: {
    position: "static",
    backgroundColor: "white",
    color: "black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appbar: {
    position: "static",
    backgroundColor: "inherit",
    color: "black",
    marginBottom: "2vh"
  },
  navbar: {
    display: "flex",
    justifyContent: "space-evenly"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    flex: 4,
    minHeight: "5vh"
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    minWidth: "100%"
  },
  inputInput: {
    padding: theme.spacing(1),
    transition: theme.transitions.create("width"),
    minWidth: "100%"
  }
}));

const SearchHeader = props => {
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    setLocation(props.location.pathname);
  }, [props.location.pathname]);
  const classes = useStyles();
  const MultiSelectChangeHandler = catsArr => {
    setCategories(catsArr);
  };
  const searchType = (() => {
    if (location === '/search/reviews') {
      return 'reviews'
    } else if (location === '/search/users') {
      return 'users'
    } else {
      return 'restaurants'
    }
  })()
  const handleSearchSubmit = query => {
    dispatch(
      searchAction({
        type: searchType,
        query: query,
        categories: categories
      })
    );
  };
  return (
    <>
      <AppBar className={classes.searchbar}>
        <Search classes={classes} submit={handleSearchSubmit} />
        {location === "/search" ? (
          <MultiSelect change={MultiSelectChangeHandler} />
        ) : null}
      </AppBar>
      <AppBar className={classes.appbar}>
        <Navbar styles={classes.navbar} />
      </AppBar>
    </>
  );
};

export default withRouter(SearchHeader);
