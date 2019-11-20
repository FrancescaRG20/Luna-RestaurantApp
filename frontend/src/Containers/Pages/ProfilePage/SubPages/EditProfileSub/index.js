import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../../../../Components/Button";
import { updateUserProfileAction } from "../../../../../store/actions/updateUserProfileAction";
import "./style.css";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: "white",
    width: "25vw",
    borderRadius: "3px",
    borderColor: "#ebebeb"
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  }
}));

const EditProfileSubPage = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const tempState = useSelector(
    ({ userLoginReducer }) => userLoginReducer.user
  );

  useEffect(() => {
    setValues({
      ...values,
      // username: tempState.username,
      first_name: tempState.first_name,
      last_name: tempState.last_name,
      email: tempState.email,
      description: tempState.profile[0].description,
      phone: tempState.profile[0].phone,
      things_I_love: tempState.profile[0].things_I_love,
      location: tempState.profile[0].location
    });
  }, []);

  const [values, setValues] = React.useState({
    // username: "",
    email: "",
    description: "",
    first_name: "",
    last_name: "",
    location: "",
    things_I_love: "",
    phone: ""
  });

  const updateUserProfileDetails = async event => {
    event.preventDefault();
    await dispatch(updateUserProfileAction(values));
    props.history.push("/profile");
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <>
      <h2 className="profile-main-title">EDIT USERPROFILE</h2>
      <form className="profile-form">
        {/* <h3 className="profile-update">Username</h3>
        <TextField
          onChange={handleChange("username")}
          id="username-input"
          className={classes.textField}
          type="text"
          name="username"
          margin="normal"
          variant="outlined"
          value={values.username}
        /> */}
        <h3 className="profile-update">First Name</h3>
        <TextField
          onChange={handleChange("first_name")}
          id="firstName-input"
          className={classes.textField}
          type="text"
          name="first_name"
          margin="normal"
          variant="outlined"
          value={values.first_name}
        />
        <h3 className="profile-update">Last Name</h3>
        <TextField
          onChange={handleChange("last_name")}
          id="lastName-input"
          className={classes.textField}
          type="text"
          name="last_name"
          margin="normal"
          variant="outlined"
          value={values.last_name}
        />
        <h3 className="profile-update">E-Mail</h3>
        <TextField
          onChange={handleChange("email")}
          id="email-input"
          className={classes.textField}
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
          value={values.email}
        />
        <h3 className="profile-update">Location</h3>
        <TextField
          onChange={handleChange("location")}
          id="location-input"
          className={classes.textField}
          type="location"
          name="location"
          autoComplete="location"
          margin="normal"
          variant="outlined"
          value={values.location}
        />
        <h3 className="profile-update">Phone</h3>
        <TextField
          onChange={handleChange("phone")}
          id="phone-input"
          className={classes.textField}
          type="number"
          name="phone"
          autoComplete="phone"
          margin="normal"
          variant="outlined"
          value={values.phone}
        />
        <h3 className="profile-update">Things I love</h3>
        <TextField
          onChange={handleChange("things_I_love")}
          id="love-input"
          className={classes.textField}
          type="text"
          name="things_I_love"
          margin="normal"
          variant="outlined"
          value={values.things_I_love}
        />
        <h3 className="profile-update">Description</h3>
        <TextField
          onChange={handleChange("description")}
          id="description-input"
          className={classes.textField}
          type="text"
          name="description"
          margin="normal"
          variant="outlined"
          value={values.description}
        />
        <Button value="Save" click={updateUserProfileDetails} />
      </form>
    </>
  );
};

export default EditProfileSubPage;
