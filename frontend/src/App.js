import React, {useEffect} from "react";
import { useDispatch,useSelector} from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Routes from "./Containers/Routes";
import SearchRoutes from "./Containers/Routes/SearchSubRoutes";
import Header from "./Components/Headers";
import Footer from "./Components/Footer";
import { userProfile } from "./store/actions/getUserProfileAction";
import {userLogin } from './store/actions/loginAction'

const App = () => {
  const dispatch = useDispatch()
  const authenticated = useSelector(
    state => state.userLoginReducer.authenticated
  );
  useEffect(()=>{
    if(!authenticated){
      if(localStorage.user && localStorage.token){
        dispatch(userLogin(localStorage.token))
        dispatch(userProfile(JSON.parse(localStorage.user)))
      }
    }
  },[])
  return (
    <Router>
      <Header />
      <Switch>
        <Routes />
        <SearchRoutes/>
      </Switch>
      <Footer/>
    </Router>
  );
};

export default App;