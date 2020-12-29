import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetContentByUserId } from "../content/GetContentByUserId.js";
import { ContentViewRequestContext } from "../content_view_request/ContentViewRequestProvider.js";

export const UserDetail = (props) => {
  const currentUser = parseInt(localStorage.getItem("whoyou_user_id"));
  const [userContent, setUserContent] = useState([]);
  const { contentViewRequests, getContentViewRequests } = useContext(
    ContentViewRequestContext
  );
  const { userId } = useParams();

  useEffect(() => {
    getContentViewRequests();
    GetContentByUserId(userId).then(setUserContent);
  }, []);

  return (
    <>
      {userContent.map((content) => {
        const matchingRequest = contentViewRequests.find((viewRequest) => {
          return (
            viewRequest.content.id === content.id
            // &&
            // viewRequest.requester.id === currentUser
          );
        });

        return (
          <>
            <div key={content.id}>
              {content.field_type.name}: {content.value}
            </div>
            <div>
              Is there a matching request: {matchingRequest ? "yes" : "no"}
            </div>
          </>
        );
      })}
    </>
  );
};
