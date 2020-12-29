import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { GetContentByUserId } from "../content/GetContentByUserId.js";
import { ContentViewRequestContext } from "../content_view_request/ContentViewRequestProvider.js";
import { BiCheckCircle } from "react-icons/bi";

export const UserDetail = (props) => {
  const currentUser = parseInt(localStorage.getItem("whoyou_user_id"));
  const [userContent, setUserContent] = useState([]);
  const {
    contentViewRequests,
    getContentViewRequests,
    createContentViewRequest,
  } = useContext(ContentViewRequestContext);
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
            // find a request that was created by this user AND
            viewRequest.requester.id === currentUser &&
            // the requested content matches the current
            viewRequest.content.id === content.id
          );
        });
        const isValueRestricted = content.value === "restricted value";

        return (
          <div key={content.id}>
            <span>{content.field_type.name}: </span>
            {isValueRestricted ? (
              matchingRequest ? (
                <Button variant="primary-disabled">Request Sent</Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => {
                    createContentViewRequest(content.id);
                  }}
                >
                  Request Value
                </Button>
              )
            ) : (
              <span>
                {content.value}{" "}
                {matchingRequest ? (
                  <BiCheckCircle style={{ color: "green", fontSize: "24px" }} />
                ) : (
                  ""
                )}
              </span>
            )}
          </div>
        );
      })}
    </>
  );
};
