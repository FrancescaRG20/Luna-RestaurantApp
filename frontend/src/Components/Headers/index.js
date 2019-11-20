import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';
import {withRouter} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../assets/LunaLogo.svg';
import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core';
import HalfHalfButton from './HalfHalfButton'
import {useSelector, useDispatch} from 'react-redux'
import Button from '../Button'
import {logoutAction} from '../../store/actions/logoutAction'

const useStyles = makeStyles(theme=>({
  header:{
    minHeight: '7vh',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor:'white',
    // position:'fixed',
    color: 'black',
    borderBottom: 'solid grey 1px',
    top: 0,
    bottom: 'auto'
  },
  toolbar:{
    minHeight: '7vh',
  },
  logo: {
  marginRight: theme.spacing(2),
  maxHeight: '7vh !important',
  },
  title:{
    flexGrow:'1',
  },
  rightSide:{
      display:'flex;',
      alignItems:'center',
  },
  navbar:{
      display: 'flex',
      justifyContent:'space-between',
      marginRight: '100px',
  }
}))

const Header = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const userState = useSelector(({userLoginReducer})=>userLoginReducer)
  const [value, setValue] = useState({authenticated: false})
  useEffect(() => {
    setValue({...value, authenticated: userState.authenticated})
  }, [userState])
  const handleLogout= ()=>{
    console.log('logout called')
    dispatch(logoutAction())
  }
    return (
      <>
        <AppBar  className={classes.header} >
        <ToolBar className={classes.toolbar}>
        <Container>
        <Link to='/'>
        <img src={logo} className={classes.logo}/>
        </Link>
        </Container>
        
        <Container className={classes.rightSide}>
        
        <Navbar style= {classes.navbar}/>
        
        {!value.authenticated ? <HalfHalfButton/> : <Button value='Logout' click={handleLogout}/>}
        </Container>
        
        </ToolBar>
        </AppBar>
      </>
    )  
}
export default withRouter(Header);
