import React, { useContext, useEffect } from "react";
import { Container, Image, ListGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { UserContext } from "./UserProvider";
import avitarPlaceholder from "../../images/avitarPlaceholder192.png";

export const UserList = () => {
  const { users, getUsers } = useContext(UserContext);
  const history = useHistory();

  useEffect(getUsers, []);

  return (
    <Container>
      {users.map((user) => {
        return (
          <ListGroup.Item
            key={user.id}
            onClick={() => history.push(`users/${user.id}`)}
          >
            <Image src={avitarPlaceholder} width="10%" />
            {user.name}
          </ListGroup.Item>
        );
      })}
    </Container>
  );
};
