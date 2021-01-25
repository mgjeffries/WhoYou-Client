import React, { useContext, useEffect, useState } from "react";
import { Button, Image, ListGroup } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { ContentViewRequestContext } from "../content_view_request/ContentViewRequestProvider.js";
import { BiCheckCircle } from "react-icons/bi";
import { GoGlobe, GoLock } from "react-icons/go";
import { ContentContext } from "../content/ContentProvider.js";
import avitarPlaceholder from "../../images/avitarPlaceholder192.png";
import { UserContext } from "./UserProvider.js";

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
  const { users, getUsers } = useContext(UserContext);
  const [userAvitar, setUserAvitar] = useState(avitarPlaceholder);
  var QRCode = require("qrcode.react");

  useEffect(() => {
    getContentViewRequests();
    getContentByUserId(userId).then(setUserContent);
    getUsers();
  }, [userId]);

  useEffect(() => {
    const user = users.find((u) => u.id === parseInt(userId));
    user // Check if the user data has been retrieved
      ? user.profile_image_path === null // Check if the user's profile image is null
        ? setUserAvitar(avitarPlaceholder)
        : setUserAvitar(user.profile_image_path)
      : setUserAvitar(avitarPlaceholder);
  }, [users]);

  return (
    <>
      <ListGroup className="container">
        {currentUser === parseInt(userId) ? (
          <>
            <div className="d-flex mx-auto">Scan to share profile!</div>
            <QRCode
              className="d-flex mx-auto my-2"
              value="https://github.com/mgjeffries/whoyou-client"
            />
          </>
        ) : (
          <Image className="d-flex mx-auto" src={userAvitar} width="30%" />
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
