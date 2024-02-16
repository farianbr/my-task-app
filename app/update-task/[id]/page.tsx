"use client";

import UpdateContent from "../../components/Modals/UpdateContent";
import { useSearchParams } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get("key");

  return <UpdateContent id={id}></UpdateContent>;
};

export default page;
