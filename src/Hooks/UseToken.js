import { useEffect, useState } from "react";

const UseToken = (user) => {
  const [token, setToken] = useState("");
  console.log(user);
  useEffect(() => {
    const email = user?.user?.email;
    const displayName = user?.user?.displayName;
    const userInformation = { displayName: displayName, email: email };
    if (email) {
      fetch(`http://localhost:5000/user/${email}`, {
        method: "PUT",
        body: JSON.stringify(userInformation),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const accessToken = data.token;
          localStorage.setItem("accessToken", accessToken);
          setToken(accessToken);
          console.log(data);
        });
    }
  }, [user]);

  return [token, setToken];
};

export default UseToken;
