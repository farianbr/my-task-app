"use client";
import { SignIn } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <>
      <h1 className="text-center text-3xl mt-20">Welcome to My Task App</h1>
      <div className="flex justify-center items-center h-4/5">
        <SignIn></SignIn>
      </div>
    </>
  );
};

export default page;
