export const GetContentByUserId = (contentOwnerId) => {
  return fetch(`http://localhost:8000/content?owner=${contentOwnerId}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("whoyou_user_token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
