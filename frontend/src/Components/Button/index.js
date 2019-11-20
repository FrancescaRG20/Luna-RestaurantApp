import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const Button = (props) => {
    const classes = makeStyles(theme =>({
        button:{
            backgroundColor: theme.custom.primary,
            color: 'white', /* text color */
            display: 'inline-block',
            padding: '10px 18px', /* space around text */
            textTransform: 'uppercase', /* all capital letters */
            fontWeight: '700',
            fontSize:'1em',
            letterSpacing: '1px',
            borderRadius: '20px',
            border: 'none',
            minWidth: '8vw',
            margin: theme.spacing(2),
            cursor: 'pointer'
            },
        
        }))() 
    return(
        <>
        {props.click ? <button className={classes.button} onClick={props.click}>{props.value}</button> :  <button className={classes.button}>{props.value}</button> }
        </>
        
    )
}

export default Button 