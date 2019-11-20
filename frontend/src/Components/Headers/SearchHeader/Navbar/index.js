import React from 'react';
import { NavLink } from 'react-router-dom';
import  Container  from '@material-ui/core/Container';


const Navbar = (props) => {
  return (
      <Container className={props.styles} >
      
      <NavLink exact to='/search'><h3>Restaurants</h3></NavLink>
      <NavLink exact to='/search/reviews'><h3>Reviews</h3></NavLink>
      <NavLink exact to='/search/users'><h3>Users</h3></NavLink>
      
      </Container>
    )
  
}

export default Navbar
