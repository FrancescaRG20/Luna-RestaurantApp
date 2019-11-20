import React from 'react';
import HomePage from "../Pages/HomePage";
import ProfilePage from '../Pages/ProfilePage'
import { Route } from "react-router-dom";
import  SearchSubRoutes  from "./SearchSubRoutes";
import AuthComponent from '../../HOC/authComponent';
import LoginPage from '../Pages/AuthPages/Login'
import SignUpPage from '../Pages/AuthPages/SignUp'
import VerificationPage from '../Pages/AuthPages/Verification'
import RestaurantPage from '../Pages/RestaurantPage';
import CreateRestaurantPage from '../Pages/RestaurantPage/CreateRestaurantPage'
import WriteRestaurantReview from '../Pages/RestaurantPage/WriteRestaurantReviewPage';

const Routes = ()=> {  
    return (
      <>
      <Route exact path='/' component={ HomePage }/>
      <Route path='/profile' component={ AuthComponent(ProfilePage) }/>
      <Route exact path='/login' component={ LoginPage }/>
      <Route exact path='/restaurant/:id' component={ RestaurantPage }/>
      <Route exact path='/write-review/:id' component={ WriteRestaurantReview }/>
      <Route exact path='/sign-up' component={ SignUpPage }/>
      <Route exact path='/new-restaurant' component={ CreateRestaurantPage }/>
      <Route exact path='/verification/:val' component={ VerificationPage }/>
      <Route path='/search' component={ SearchSubRoutes }/>
      
      </>
    )
}

export default Routes
