import React from "react";
import { ServerPath } from "../../ServerPath.js";

export const ContentContext = React.createContext();

export const ContentProvider = (props) => {
  const getContentByUserId = (contentOwnerId) => {
    return fetch(`${ServerPath}/content?owner=${contentOwnerId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("whoyou_user_token")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  };

  const updateContent = (contentId, requestBody) => {
    return fetch(`${ServerPath}/content/${contentId}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${localStorage.getItem("whoyou_user_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }).then(() => {});
  };

  return (
    <ContentContext.Provider
      value={{
        getContentByUserId,
        updateContent,
      }}
    >
      {props.children}
    </ContentContext.Provider>
  );
};
