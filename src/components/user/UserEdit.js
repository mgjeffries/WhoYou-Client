import React, { useContext, useEffect, useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { ContentViewRequestContext } from "../content_view_request/ContentViewRequestProvider.js";
import { BiCheckCircle } from "react-icons/bi";
import { ContentContext } from "../content/ContentProvider.js";

export const UserEdit = (props) => {
  const currentUser = parseInt(localStorage.getItem("whoyou_user_id"));
  const [userContent, setUserContent] = useState([]);
  const { getContentByUserId, updateContent } = useContext(ContentContext);
  const {
    contentViewRequests,
    getContentViewRequests,
    createContentViewRequest,
    deleteContentViewRequest,
  } = useContext(ContentViewRequestContext);
  const { userId } = useParams();
  const history = useHistory();

  useEffect(() => {
    getContentViewRequests();
    getContentByUserId(userId).then(setUserContent);
  }, []);

  const handleControlledValue = (changeEvent, index) => {
    let updatedUserContent = userContent.slice();
    updatedUserContent[index].value = changeEvent.target.value;
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
                  handleControlledValue(changeEvent, index);
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
              updateContent(content.id, requestBody);
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
