import React, { useEffect, useState } from "react";
import GridDisplay from "../../../../Components/GridDisplay";
import DisplayCard from "../../../../Components/GridDisplay/DisplayCard";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { getAllUsersAction } from "../../../../store/actions/getAllUsersAction";
import { staticUrl } from "../../../../store/constants";

const UsersPage = props => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const classes = makeStyles(theme => ({}))();
  let usersResults = useSelector(({ searchReducer }) => searchReducer.users);
  let allUsers = useSelector(({ allItemsReducer }) => allItemsReducer.users);
  useEffect(() => {
    if (!usersResults) {
      dispatch(getAllUsersAction());
      setUsers(allUsers);
    } else {
      setUsers(usersResults);
    }
  }, [usersResults, users]);

  return (
    <GridDisplay>
      {users.map(user => (
        <DisplayCard
          key={user.id}
          imageUrl={staticUrl + user.profile[0].avatar}
          imageTitle={user.username}
        >
          <h3>
            {user.first_name
              ? user.first_name + " " + user.last_name
              : user.username}
          </h3>
          <h6>{user.profile[0].description}</h6>
        </DisplayCard>
      ))}
    </GridDisplay>
  );
};

export default UsersPage;
