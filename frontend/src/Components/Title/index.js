import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const Title = props => {
  const classes = makeStyles(theme => ({
    titleContainer: {
      textAlign: "center",
      height: "10vh",
      paddingTop: "4vh",
      marginBottom: "4vh"
    },
    title: {
      borderBottom: " #E47D30 solid 2px"
    }
  }))();
  return (
    <Container className={classes.titleContainer}>
      <Typography variant="h4" className={classes.title}>
        {props.children}
      </Typography>
    </Container>
  );
};

export default Title;
