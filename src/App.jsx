import React, { useEffect, useState } from "react";
import { Grid2 } from "@mui/material";
import CustomButton from "./components/CustomButton";
import TaskInputForm from "./components/TaskInputForm";
import axios from "axios";
import TaskCard from "./components/TaskCard";

const App = () => {
  const [visible, isVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const fetchAllTasks = async () => {
    let response = await axios.get(`${import.meta.env.VITE_BASE_URL}/task`);
    setTasks(response.data.tasks);
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <Grid2
      container
      spacing={2}
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <CustomButton
        label="Add Task"
        id="add"
        onClick={() => {
          console.log("add button clicked");
          isVisible(!visible);
        }}
      />
      {visible && <TaskInputForm />}
      {tasks ? <TaskCard tasks={tasks} /> : null}
    </Grid2>
  );
};

export default App;
