import React, { useContext, useEffect, useState } from "react";
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
    const updatedContentViewRequestsByOthers = contentViewRequests.filter(
      (contentViewRequest) => {
        return contentViewRequest.requester.id !== currentUser;
      }
    );
    setContentViewRequestsByOthers(updatedContentViewRequestsByOthers);
  }, [contentViewRequests]);

  return (
    <div>
      {contentViewRequestsByOthers.map((contentViewRequest) => {
        return (
          <div key={contentViewRequest.id}>
            <div>{contentViewRequest.requester.name}</div>
            <div>{contentViewRequest.content.field_type.name}</div>
            <ToggleButton
              inactiveLabel={<div>X</div>}
              activeLabel={<div>+</div>}
              value={contentViewRequest.is_approved}
              onToggle={(value) => {
                approveContentViewRequest(contentViewRequest.id, !value);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
