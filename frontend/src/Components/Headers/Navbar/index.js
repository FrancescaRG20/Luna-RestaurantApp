import React from 'react';
import { NavLink } from 'react-router-dom';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'


const Navbar = (props) => {
  return (
      <Container className={props.style}>
      
      <NavLink exact to='/'><Typography variant='h6' gutterBottom>Home</Typography></NavLink>
      <NavLink to='/search'><Typography variant='h6' gutterBottom>Search</Typography></NavLink>
      <NavLink exact to='/profile'><Typography variant='h6' gutterBottom>Profile</Typography></NavLink>
      
      </Container>
    )
  
}

export default Navbar
