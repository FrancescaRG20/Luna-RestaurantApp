import React from 'react'
import { AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography'
import Navbar from './Navbar'
import Twitter from '../../assets/SocialIcons/twitter.svg'
import Facebook from '../../assets/SocialIcons/facebook.svg'
import Google from '../../assets/SocialIcons/googleplus.svg'
import Instagram from '../../assets/SocialIcons/instagram.svg'
const Footer = () =>{
    const classes = makeStyles(theme => ({
        appBar: {
          top: 'auto',
          bottom: 0,
          backgroundColor: 'white',
          color: 'black'
        },
        navbar:{
            display:'flex',
            justifyContent:'space-between',
            width: '35vw',
            alignItems: 'center',
            height: '100%',
            marginLeft: theme.spacing(2)
        },
        navSocial:{
            display: 'flex',
            justifyContent: 'space-between'
        },
        socialDiv:{
            display: 'flex',
            flexDirection: 'row',
            width: '15vw',
            justifyContent: 'space-evenly',
            margin: theme.spacing(1)
        }
      }))();
    // const classes = useStyles()
      
    return(
        <AppBar className ={classes.appBar}>
            <div className={classes.navSocial}>
            <div>
            <Navbar style={classes.navbar}/>
            </div>
            <div className={classes.socialDiv}>
            <img src={Facebook}/>
            <img src={Twitter}/>
            <img src={Google}/>
            <img src={Instagram}/>
            </div>
            </div>

            <Divider/>
            
            <Typography variant='caption'>© Copyright Luna 2016</Typography>
            
        </AppBar>
    )
}
export default Footer