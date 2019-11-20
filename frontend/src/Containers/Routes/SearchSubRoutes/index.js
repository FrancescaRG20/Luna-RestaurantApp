import React from 'react';
import { Route } from "react-router-dom";
import SearchHeader from '../../../Components/Headers/SearchHeader';
import RestaurantPage from '../../Pages/SearchPages/RestaurantPage';
import ReviewsPage from '../../Pages/SearchPages/ReviewsPage';
import UsersPage from '../../Pages/SearchPages/UsersPage';

const PostRoutes = ()=> {  
    return (  
        <>
      <SearchHeader/>
        <Route exact path='/search/' component={ RestaurantPage }/>
        <Route path='/search/reviews' component={ ReviewsPage }/>
        <Route path='/search/users' component={ UsersPage }/>
        <Route exact path='/search/results' component={ RestaurantPage }/>
      </>
    )
}

export default PostRoutes
