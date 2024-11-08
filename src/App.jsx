import React, { useEffect, useState } from "react";
import { Grid2 } from "@mui/material";
import CustomButton from "./components/CustomButton";
import TaskInputForm from "./components/TaskInputForm";
import axios from "axios";
import TaskCard from "./components/TaskCard";

const App = () => {
  const [visible, setVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetchTask = async () => {
    try {
      setError(false);
      setLoading(true);
      let response = await axios.get(`${import.meta.env.VITE_BASE_URL}/task`);
      setTasks(response.data.tasks);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);
  const handelTaskUploaded = async () => {
    await fetchTask();

    setTimeout(() => setVisible(false), 3500);
  };

  const toggleTaskForm = () => setVisible((prevVisible) => !prevVisible);

  return (
    <Grid2
      container
      spacing={2}
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <CustomButton label="Add Task" id="add" onClick={toggleTaskForm} />
      {visible && <TaskInputForm onTaskUploaded={handelTaskUploaded} />}
      {loading && <p>Loading....</p>}

      {error ? <p>Error Fetching Tasks</p> : <TaskCard tasks={tasks} />}
    </Grid2>
  );
};

export default App;
