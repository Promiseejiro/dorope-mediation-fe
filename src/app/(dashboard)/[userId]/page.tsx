"use client";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "@/request/userRequest";
import Loader from "@/components/ui/Loader";
const LoaderDashboard = () => {
  const router = useRouter();
  let route = "/";

  const { data, error } = useQuery({
    queryKey: ["fetchuser-details"],
    queryFn: getUserDetails,
  });
  if (!data?.registrationComplete) {
    router.push("/onboarding");
  } else {
    router.push("/select-organization");
  }

  return (
    <>
      <Loader fullPage />
    </>
  );
};

export default LoaderDashboard;
