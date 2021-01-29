import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Image } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { ContentViewRequestContext } from "../content_view_request/ContentViewRequestProvider.js";
import { ContentContext } from "../content/ContentProvider.js";
import ToggleButton from "react-toggle-button";
import { UserContext } from "./UserProvider.js";
import avitarPlaceholder from "../../images/avitarPlaceholder192.png";

export const UserEdit = (props) => {
  const currentUser = parseInt(localStorage.getItem("whoyou_user_id"));
  const [userContent, setUserContent] = useState([]);
  const { users, getUsers } = useContext(UserContext);
  const { getContentByUserId, updateContent } = useContext(ContentContext);
  const { getContentViewRequests } = useContext(ContentViewRequestContext);
  const { updateUserAvitar } = useContext(UserContext);
  const { userId } = useParams();
  const [userAvitar, setUserAvitar] = useState(avitarPlaceholder);
  const history = useHistory();

  useEffect(() => {
    // Redirect users who don't own this profile
    if (parseInt(userId) !== currentUser) {
      history.push(`/users/${userId}`);
    }
    getContentViewRequests();
    getContentByUserId(userId).then(setUserContent);
    getUsers();
  }, []);

  useEffect(() => {
    const thisUser = users.find((u) => u.id === currentUser);
    if (thisUser) {
      setUserAvitar(thisUser.profile_image_path);
    }
  }, [users]);

  const handleValueChange = (changeEvent, index) => {
    let updatedUserContent = userContent.slice();
    updatedUserContent[index].value = changeEvent.target.value;
    setUserContent(updatedUserContent);
  };

  const handlePrivacyChange = (toggleState, index) => {
    let updatedUserContent = userContent.slice();
    updatedUserContent[index].is_public = !toggleState;
    setUserContent(updatedUserContent);
  };

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const createUserAvitarString = (event) => {
    getBase64(event.target.files[0], (base64ImageString) => {
      setUserAvitar(base64ImageString);
    });
  };

  return (
    <>
      <Form className="container">
        <Form.Group>
          <Image src={userAvitar} width="10%" />
          <Form.Label>Profile Image </Form.Label>
          <Form.Row>
            <input type="file" onChange={createUserAvitarString} />
            <Button
              onClick={() => {
                updateUserAvitar(currentUser, userAvitar);
              }}
            >
              Upload
            </Button>
          </Form.Row>
        </Form.Group>
        {userContent.map((content, index) => {
          return (
            <Form.Group key={content.id} className="col">
              <Form.Label>{content.field_type.name} </Form.Label>
              <Form.Row>
                <Col>
                  <Form.Control
                    value={content.value}
                    onChange={(changeEvent) => {
                      handleValueChange(changeEvent, index);
                    }}
                  />
                </Col>
                <Col className="col-auto d-flex">
                  <ToggleButton
                    inactiveLabel={<div>Private</div>}
                    activeLabel={<div>Public</div>}
                    value={content.is_public}
                    onToggle={(value) => {
                      handlePrivacyChange(value, index);
                    }}
                  />
                </Col>
              </Form.Row>
            </Form.Group>
          );
        })}
      </Form>
      <div className="d-flex mx-auto my-2 container justify-content-center">
        <Button
          className="mx-2"
          variant="secondary"
          onClick={() => {
            history.push(`/users/${userId}`);
          }}
        >
          Cancel
        </Button>
        <Button
          className="mx-2"
          onClick={() => {
            const promises = userContent.map((content) => {
              const requestBody = {
                field_type: content.field_type.id,
                value: content.value,
                owner: content.owner.id,
                is_public: content.is_public,
              };
              return updateContent(content.id, requestBody);
            });
            Promise.all(promises).then(() => history.push(`/users/${userId}`));
          }}
        >
          Save Changes
        </Button>
      </div>
    </>
  );
};
