"use client"
import Tasks from "./components/Tasks/Tasks";
import { useGlobalState } from "./context/globalProviders";


export default function Home() {
  const {tasks} = useGlobalState()
  return (
    <Tasks title="All Tasks" tasks={tasks}></Tasks>
  );
}
