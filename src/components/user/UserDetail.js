import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const UserDetail = (props) => {
  const currentUser = parseInt(localStorage.getItem("whoyou_user_id"));
  const [userContent, setUserContent] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    // getPostById(postId).then(setPost);
  }, []);

  return <div>User Detail for user {userId}</div>;
};
