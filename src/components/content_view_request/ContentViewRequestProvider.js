import React, { useState } from "react";
import { ServerPath } from "../../ServerPath.js";

export const ContentViewRequestContext = React.createContext();

export const ContentViewRequestProvider = (props) => {
  const [contentViewRequests, setContentViewRequests] = useState([]);

  const getContentViewRequests = () => {
    //TODO: This will get the content view requests to/from the active user
    return fetch(`${ServerPath}/contentViewRequest`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("whoyou_user_token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(setContentViewRequests);
  };

  const createContentViewRequest = (contentId) => {
    const requestBody = { content: contentId };
    return fetch(`${ServerPath}/contentViewRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("whoyou_user_token")}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((newContentViewRequest) => {
        getContentViewRequests();
        return newContentViewRequest;
      });
  };

  const approveContentViewRequest = (contentId, isApproved) => {
    const requestBody = { is_approved: isApproved };
    return fetch(`${ServerPath}/contentViewRequest/${contentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("whoyou_user_token")}`,
      },
      body: JSON.stringify(requestBody),
    }).then((newContentViewRequest) => {
      getContentViewRequests();
    });
  };

  const deleteContentViewRequest = (contentViewRequestId) => {
    return fetch(`${ServerPath}/contentViewRequest/${contentViewRequestId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("whoyou_user_token")}`,
      },
    }).then(() => getContentViewRequests());
  };

  return (
    <ContentViewRequestContext.Provider
      value={{
        contentViewRequests,
        getContentViewRequests,
        createContentViewRequest,
        deleteContentViewRequest,
        approveContentViewRequest,
      }}
    >
      {props.children}
    </ContentViewRequestContext.Provider>
  );
};
