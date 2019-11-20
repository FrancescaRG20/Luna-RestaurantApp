import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import clsx from 'clsx'
import Container from '@material-ui/core/Container'
import {Link} from 'react-router-dom'

const HalfHalfButton = () => {
    const classes = makeStyles(theme =>({
        button:{
            backgroundColor: theme.custom.primary,
            color: 'white', /* text color */
            display: 'inline-block',
            padding: '10px 18px', /* space around text */
            textTransform: 'uppercase', /* all capital letters */
            fontWeight: '700',
            letterSpacing: '1px',
            },
            left:{
                borderRadius: '20px 0 0 20px'
            },
            right:{
                borderRadius: '0 20px 20px 0'
            },
        }))() 
        const buttonLeft = clsx(classes.button, classes.left)
        const buttonRight = clsx(classes.button, classes.right)
    return(
        <Container>
        <Link exact to='/sign-up'>
        <button className={buttonLeft}>SignUp</button>
        </Link>
        <Link exact to='/login'>
        <button className={buttonRight}>Login</button>
        </Link>
        </Container>
    )
}

export default HalfHalfButton 