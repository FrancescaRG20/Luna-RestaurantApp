import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container'
import  Typography  from '@material-ui/core/Typography';


const Navbar = (props) => {
  return (
      <div className={props.style}>
      
      <Link exact to='About'><Typography variant='subtitle1'>About</Typography></Link>
      <Link exact to='/press'><Typography variant='subtitle1'>Press</Typography></Link>
      <Link exact to='/blog'><Typography variant='subtitle1'>Blog</Typography></Link>
      <Link exact to='/ios'><Typography variant='subtitle1'>IOS</Typography></Link>
      <Link exact to='/andrios'><Typography variant='subtitle1'>Android</Typography></Link>
      
      </div>
    )
  
}

export default Navbar
