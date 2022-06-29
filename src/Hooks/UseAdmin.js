import React, { useEffect, useState } from "react";

const UseAdmin = (user) => {
  const [admin, setAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  useEffect(() => {
    const email = user?.email;
    if (email) {
      fetch(`https://intense-plateau-54634.herokuapp.com/admin/${email}`, {
        method: "GET",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      })
        .then((response) => response.json())
        .then((data) => {
          setAdmin(data.admin);
          setAdminLoading(false);
        });
    }
  }, [user]);
  return [admin, adminLoading];
};

export default UseAdmin;
