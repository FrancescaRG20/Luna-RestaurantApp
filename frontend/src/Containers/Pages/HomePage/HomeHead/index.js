import React from 'react'
import Container  from '@material-ui/core/Container'
import { makeStyles} from '@material-ui/core/styles'
import background from '../../../../assets/temp-bg.jpg'
import Search from '../../../../Components/Search'
import Button from '../../../../Components/Button'
import ImageHead from '../../../../Components/HeadImage'

const HomeSearch = (props) =>{
    const classes = makeStyles(theme=>({
        searchContainer: {
            position: "static",
            color: "black",
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems:'center',
          },
          search: {
            
            display:'flex',
            height: '35vh',
            alignItems:'center',
            borderRadius: theme.shape.borderRadius,
            justifyContent:'center',
          },
          searchIcon: {
            width: theme.spacing(7),
            height: "100%",
            position: "absolute",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          },
          inputRoot: {
            color: "inherit",
            backgroundColor:'white',
            width: '35vw'
          },
          inputInput: {
            padding: theme.spacing(1),
            transition: theme.transitions.create("width"),
            
          }
       
    }))()
    return(
        <ImageHead height='35vh' image={background}>
        <Container className={classes.searchContainer}>
        
        <Search classes={classes} submit={props.searchSubmit}>
        <Button value='Search'/>
        </Search>
        
        </Container>
        </ImageHead>
    )
}

export default HomeSearch