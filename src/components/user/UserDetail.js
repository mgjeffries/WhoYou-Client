import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetContentByUserId } from "../content/GetContentByUserId.js";

export const UserDetail = (props) => {
  // const currentUser = parseInt(localStorage.getItem("whoyou_user_id"));
  const [userContent, setUserContent] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    const userContentResponse = GetContentByUserId(userId).then(setUserContent);
  }, []);

  return (
    <>
      <div>User Detail for user {userId}</div>
      <div>Content Count {userContent.length}</div>
    </>
  );
};
