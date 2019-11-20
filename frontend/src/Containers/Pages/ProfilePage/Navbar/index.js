import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Container from "@material-ui/core/Container";
import StarIcon from "../../../../assets/star.svg";
import CommentIcon from "../../../../assets/comment.svg";
import EditPencil from "../../../../assets/edit.svg";
import "./style.css";

const Navbar = props => {
  const [value, setValue] = useState({
    user: {}
  });

  const tempState = useSelector(state => state);

  useEffect(() => {
    setValue({
      user: tempState.userLoginReducer.user
    });
    console.log("Francescaaa", tempState);
  }, [tempState]);

  return (
    <Container className={props.style}>
      <h2 className="navbar-profile-owner">{value.user.first_name}'s profile</h2>
      <NavLink className="navbar-wrapper" exact to="/profile">
        <img src={StarIcon} />
        <h3 className="navbar-profile-title">Reviews</h3>
      </NavLink>
      <NavLink className="navbar-wrapper" exact to="/profile/comments">
        <img src={CommentIcon} />
        <h3 className="navbar-profile-title">Comments</h3>
      </NavLink>
      <NavLink className="navbar-wrapper" exact to="/profile/edit">
        <img src={EditPencil} />
        <h3 className="navbar-profile-title">Edit Profile</h3>
      </NavLink>
    </Container>
  );
};

export default Navbar;
