import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CardMedia from '@material-ui/core/CardMedia';


const DisplayCard = props => {
  const classes = makeStyles(theme => ({
    paper: {
      margin: theme.spacing(2),
      padding: theme.spacing(2),
      height: "40vh",
      width: "17.5vw",
      borderTop: `1vh ${theme.custom.primary} solid `
    },
    media: {
      height: 50,
      paddingTop: "50%"
    },
    gridCursor: {
      cursor: "pointer"
    }
  }))();
  return (
    <>
      <Grid key={props.id} className={classes.gridCursor}>
        <Paper className={classes.paper}>
          {props.children}
          {props.imageUrl ? (
            <CardMedia
              className={classes.media}
              image={props.imageUrl}
              title={props.imageTitle}
            />
          ) : null}
        </Paper>
      </Grid>
    </>
  );
};
export default DisplayCard