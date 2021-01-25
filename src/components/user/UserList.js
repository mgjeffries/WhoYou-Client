import React, { useContext, useEffect } from "react";
import {
  Container,
  Form,
  FormControl,
  FormGroup,
  Image,
  ListGroup,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { UserContext } from "./UserProvider";
import avitarPlaceholder from "../../images/avitarPlaceholder192.png";

export const UserList = () => {
  const { users, getUsers, searchUsers } = useContext(UserContext);
  const history = useHistory();

  useEffect(getUsers, []);

  return (
    <Container>
      <FormGroup>
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          onChange={(evt) => searchUsers(evt.target.value)}
        />
      </FormGroup>
      {users.map((user) => {
        return (
          <ListGroup.Item
            key={user.id}
            onClick={() => history.push(`users/${user.id}`)}
          >
            <Image
              src={user.profile_image_path || avitarPlaceholder}
              width="10%"
            />
            {user.name}
          </ListGroup.Item>
        );
      })}
    </Container>
  );
};
