import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { ContentViewRequestContext } from "../content_view_request/ContentViewRequestProvider.js";
import { ContentContext } from "../content/ContentProvider.js";
import ToggleButton from "react-toggle-button";

export const UserEdit = (props) => {
  const currentUser = parseInt(localStorage.getItem("whoyou_user_id"));
  const [userContent, setUserContent] = useState([]);
  const { getContentByUserId, updateContent } = useContext(ContentContext);
  const { getContentViewRequests } = useContext(ContentViewRequestContext);
  const { userId } = useParams();
  const history = useHistory();

  useEffect(() => {
    // Redirect users who don't own this profile
    if (parseInt(userId) !== currentUser) {
      history.push(`/users/${userId}`);
    }
    getContentViewRequests();
    getContentByUserId(userId).then(setUserContent);
  }, []);

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

  return (
    <>
      <Form className="container">
        {userContent.map((content, index) => {
          return (
            <Form.Group key={content.id} className="col">
              <Form.Label>{content.field_type.name}: </Form.Label>

              <Form.Control
                value={content.value}
                onChange={(changeEvent) => {
                  handleValueChange(changeEvent, index);
                }}
              />
              <ToggleButton
                inactiveLabel={<div>Private</div>}
                activeLabel={<div>Public</div>}
                value={content.is_public}
                onToggle={(value) => {
                  handlePrivacyChange(value, index);
                }}
              />
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
