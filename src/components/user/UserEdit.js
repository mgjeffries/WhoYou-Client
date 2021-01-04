import React, { useContext, useEffect, useState } from "react";
import { Form, FormGroup } from "react-bootstrap";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { GetContentByUserId } from "../content/GetContentByUserId.js";
import { ContentViewRequestContext } from "../content_view_request/ContentViewRequestProvider.js";
import { BiCheckCircle } from "react-icons/bi";

export const UserEdit = (props) => {
  const currentUser = parseInt(localStorage.getItem("whoyou_user_id"));
  const [userContent, setUserContent] = useState([]);
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
    GetContentByUserId(userId).then(setUserContent);
  }, []);

  return (
    <>
      <Form className="container">
        {userContent.map((content) => {
          const matchingRequest = contentViewRequests.find((viewRequest) => {
            return (
              // find a request that was created by this user AND
              viewRequest.requester.id === currentUser &&
              // the requested content matches the current
              viewRequest.content.id === content.id
            );
          });
          const isValueRestricted = content.value === "restricted value";

          return (
            <Form.Group key={content.id} className="col">
              <Form.Label>{content.field_type.name}: </Form.Label>

              <Form.Control placholder={content.value} />
            </Form.Group>
          );
        })}
      </Form>
    </>
  );
};
