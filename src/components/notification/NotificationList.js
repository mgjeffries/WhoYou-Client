import React, { useContext, useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import ToggleButton from "react-toggle-button";
import { ContentViewRequestContext } from "../content_view_request/ContentViewRequestProvider";

export const NotificationList = () => {
  const currentUser = parseInt(localStorage.getItem("whoyou_user_id"));
  const {
    contentViewRequests,
    getContentViewRequests,
    approveContentViewRequest,
  } = useContext(ContentViewRequestContext);
  const [
    contentViewRequestsByOthers,
    setContentViewRequestsByOthers,
  ] = useState([]);

  useEffect(() => {
    getContentViewRequests();
  }, []);

  useEffect(() => {
    let updateRequestingUsers = [];
    const updatedContentViewRequestsByOthers = contentViewRequests.filter(
      (contentViewRequest) => {
        return contentViewRequest.requester.id !== currentUser;
      }
    );

    setContentViewRequestsByOthers(updatedContentViewRequestsByOthers);
  }, [contentViewRequests]);

  return (
    <ListGroup>
      {contentViewRequestsByOthers.map((contentViewRequest) => {
        return (
          <ListGroup.Item key={contentViewRequest.id}>
            <span>{contentViewRequest.requester.name}</span>
            <span> is requesting your </span>
            <span>{contentViewRequest.content.field_type.name}</span>
            <span className="d-inline-flex px-2">
              <ToggleButton
                inactiveLabel={<div></div>}
                activeLabel={<div></div>}
                value={contentViewRequest.is_approved}
                onToggle={(value) => {
                  approveContentViewRequest(contentViewRequest.id, !value);
                }}
              />
            </span>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};
