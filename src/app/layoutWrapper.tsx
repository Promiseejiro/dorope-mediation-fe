"use client";

import { axiosInstance } from "@/lib/axios";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      axiosInstance.defaults.headers.common["Authorization"] =
        "Bearer " + session?.accessToken;
    }
  }, [status, session]);
  return <>{children}</>;
};

export default LayoutWrapper;
