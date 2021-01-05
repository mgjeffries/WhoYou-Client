import React, { useContext, useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { ContentViewRequestContext } from "../content_view_request/ContentViewRequestProvider.js";
import { BiCheckCircle } from "react-icons/bi";
import { GoGlobe, GoLock } from "react-icons/go";
import { ContentContext } from "../content/ContentProvider.js";

export const UserDetail = (props) => {
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
  const { getContentByUserId } = useContext(ContentContext);
  var QRCode = require("qrcode.react");

  useEffect(() => {
    getContentViewRequests();
    getContentByUserId(userId).then(setUserContent);
  }, []);

  return (
    <>
      <ListGroup className="container">
        {currentUser === parseInt(userId) ? (
          <QRCode
            className="d-flex mx-auto my-2"
            value="https://github.com/mgjeffries/whoyou-client"
          />
        ) : (
          ""
        )}

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
            <ListGroup.Item key={content.id} className="d-flex flex-row">
              <div className="d-flex">
                {content.field_type.name}
                {": "}
              </div>
              {isValueRestricted ? (
                matchingRequest ? (
                  <Button
                    variant="primary"
                    className="ml-auto d-flex"
                    onClick={() => deleteContentViewRequest(matchingRequest.id)}
                  >
                    Request Sent
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    className="ml-auto d-flex"
                    onClick={() => {
                      createContentViewRequest(content.id);
                    }}
                  >
                    Request Value
                  </Button>
                )
              ) : (
                <>
                  <div>{content.value} </div>
                  <div className="ml-auto">
                    {matchingRequest ? (
                      <BiCheckCircle
                        style={{ color: "green", fontSize: "24px" }}
                      />
                    ) : (
                      ""
                    )}
                    {content.is_public ? (
                      <GoGlobe style={{ color: "green", fontSize: "24px" }} />
                    ) : (
                      <GoLock style={{ color: "grey", fontSize: "24px" }} />
                    )}
                  </div>
                </>
              )}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      {currentUser === parseInt(userId) ? (
        <Button
          className="d-flex my-2 mx-auto"
          onClick={() => history.push(`/users/${userId}/edit`)}
        >
          Edit Profile
        </Button>
      ) : (
        ""
      )}
    </>
  );
};
