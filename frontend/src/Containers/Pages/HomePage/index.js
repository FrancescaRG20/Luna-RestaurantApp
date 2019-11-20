import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopRestaurantsAction } from "../../../store/actions/getTopRestaurantsAction";
import { searchAction } from "../../../store/actions/searchAction";
import Head from "./HomeHead";
import GridDisplay from "../../../Components/GridDisplay";
import DisplayCard from "../../../Components/GridDisplay/DisplayCard";
import Rating from "@material-ui/lab/Rating";
import Title from "../../../Components/Title";
import { staticUrl } from "../../../store/constants";
import { makeStyles } from "@material-ui/styles";

const HomePage = props => {
  const classes = makeStyles(theme => ({
    reviewsBar: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "2vh"
    }
  }))();
  const dispatch = useDispatch();
  const restaurants = useSelector(
    ({ topRestaurantsReducer }) => topRestaurantsReducer.topRestaurants
  );
  const handleSearchSubmit = query => e => {
    e.preventDefault();
    dispatch(
      searchAction({
        type: "restaurants",
        query: query
      })
    );
    props.history.push("/search/results");
  };
  useEffect(() => {
    dispatch(getTopRestaurantsAction());
  }, []);

  return (
    <>
      <Head searchSubmit={handleSearchSubmit} />
      <Title>BEST RATED RESTAURANTS</Title>
      <GridDisplay>
        {restaurants.map(rest => (
          <DisplayCard
            key={rest.id}
            imageUrl={staticUrl + rest.picture}
            imageTitle={rest.name}
          >
            <h3>{rest.name}</h3>
            <h5>
              {rest.street}, {rest.city}
            </h5>
            <div className={classes.reviewsBar}>
              <Rating value={rest.review_avg_rating} readOnly />
              <div>{rest.review_count}</div>
            </div>
          </DisplayCard>
        ))}
      </GridDisplay>
    </>
  );
};

export default HomePage;
