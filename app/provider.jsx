"use client";

import React, { useEffect, useState } from "react";
import Header from "./_components/Header";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { UserDeatilContext } from "./_context/UserDetailContext";

function Provider({ children }) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState()
  const checkUserAuth = async () => {
    const result = await axios.post("/api/user", {
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
    });
    setUserDetail(result.data);
  };
  useEffect(() => {
    user && checkUserAuth();
  }, [user]);
  return (
    <div>
      <UserDeatilContext.Provider value={{userDetail}}>
        <Header />
        <div className="px-10 lg:px-32 xl:px48 2xl:px-56 ">{children}</div>
      </UserDeatilContext.Provider>
    </div>
  );
}

export default Provider;
