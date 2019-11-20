import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

const GridDisplay = (props) => {
    return(
        <Container maxWidth='xl'>
        <Grid container justify="center" spacing={2}>
        {props.children}
        </Grid>
        </Container>
    )
}

export default GridDisplay