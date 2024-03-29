"use client";
import React from "react";
import { useGlobalState } from "../context/globalProviders";
import Tasks from "../components/Tasks/Tasks";

const page = () => {
  const { completedTasks } = useGlobalState();
  return <Tasks title="Completed Tasks" tasks={completedTasks}></Tasks>;
};

export default page;
