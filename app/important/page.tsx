"use client";
import React from "react";
import { useGlobalState } from "../context/globalProviders";
import Tasks from "../components/Tasks/Tasks";

const page = () => {
  const { importantTasks } = useGlobalState();
  return <Tasks title="Important Tasks" tasks={importantTasks}></Tasks>;
};

export default page;
