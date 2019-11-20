import React from 'react'
import  Container  from '@material-ui/core/Container'
import {makeStyles } from  '@material-ui/core/styles'

const ImageHead = (props) =>{
    let positionType = 'static' 
    if(props.position){
        positionType = props.position
    }
    const classes = makeStyles(theme=>({
        root:{
            height: props.height,
            minWidth:'100vw',
            backgroundImage: `url(${props.image})`,
            backgroundSize: 'cover',
            backgroundPosition:'center',
            position: positionType,
            zIndex: -1,

        },
       
    }))()
    return(
        <Container className={classes.root}>
            {props.children}
        </Container>

    )
}
export default ImageHead