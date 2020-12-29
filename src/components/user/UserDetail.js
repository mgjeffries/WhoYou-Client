import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetContentByUserId } from "../content/GetContentByUserId.js";

export const UserDetail = (props) => {
  // const currentUser = parseInt(localStorage.getItem("whoyou_user_id"));
  const [userContent, setUserContent] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    GetContentByUserId(userId).then(setUserContent);
  }, []);

  return (
    <>
      {userContent.map((content) => {
        return (
          <div key={content.id}>
            {content.field_type.name}: {content.value}
          </div>
        );
      })}
    </>
  );
};
