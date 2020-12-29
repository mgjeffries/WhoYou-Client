import React, { useState } from "react";

export const ContentViewRequestContext = React.createContext();

export const ContentViewRequestProvider = (props) => {
  const [contentViewRequests, setContentViewRequests] = useState([]);

  const getContentViewRequests = () => {
    //TODO: This will get the content view requests to/from the active user
    return fetch("http://localhost:8000/contentViewRequest", {
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
    return fetch(`http://localhost:8000/contentViewRequest`, {
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

  return (
    <ContentViewRequestContext.Provider
      value={{
        contentViewRequests,
        getContentViewRequests,
        createContentViewRequest,
      }}
    >
      {props.children}
    </ContentViewRequestContext.Provider>
  );
};
