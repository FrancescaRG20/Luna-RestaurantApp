import React, { useEffect, useState } from "react";
import GridDisplay from "../../../../Components/GridDisplay";
import DisplayCard from "../../../../Components/GridDisplay/DisplayCard";
import Rating from "@material-ui/lab/Rating";
import { useDispatch, useSelector } from "react-redux";
import { staticUrl } from "../../../../store/constants";
import { makeStyles } from "@material-ui/styles";
import { getAllRestaurantsAction } from "../../../../store/actions/getAllRestaurantsAction";

const RestaurantPage = props => {
  const [restaurants, setRestaurants] = useState([]);
  const dispatch = useDispatch();
  const classes = makeStyles(theme => ({
    reviewsBar: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "2vh"
    }
  }))();
  let restaurantsResults = useSelector(
    ({ searchReducer }) => searchReducer.restaurants
  );
  let allRestaurants = useSelector(
    ({ allItemsReducer }) => allItemsReducer.restaurants
  );
  const handleRestaurantView = id => {
    props.history.push(`/restaurants/${id}`);
  }

  useEffect(() => {
      setRestaurants(restaurantsResults);
  }, [restaurantsResults, restaurants]);


  return (
    <GridDisplay>
      {restaurants.map(rest => (
        <DisplayCard
          key={rest.id}
          imageUrl={staticUrl + rest.picture}
          imageTitle={rest.name}
        >
          <h3 onClick={() => handleRestaurantView(rest.id)}>{rest.name}</h3>
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
  );
};

export default RestaurantPage;
