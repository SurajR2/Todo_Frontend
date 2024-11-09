import React, { useEffect, useState } from "react";
import { Grid2, Fab, Popover, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskInputForm from "./components/TaskInputForm";
import axios from "axios";
import TaskCard from "./components/TaskCard";

const App = () => {
  const [visible, setVisible] = useState(null);
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

  const handleTaskUploaded = async () => {
    await fetchTask();
    setTimeout(() => setVisible(null), 3500); // Close Popover after task uploaded
  };

  const toggleTaskForm = (event) => {
    setVisible(visible ? null : event.currentTarget); // Open/Close Popover
  };

  return (
    <Grid2
      container
      spacing={2}
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
      sx={{ position: "relative", minHeight: "100vh", paddingBottom: 4 }}
    >
      {loading && <CircularProgress />}
      {error ? (
        <p>Error Fetching Tasks</p>
      ) : (
        <TaskCard tasks={tasks} onTaskUpdate={fetchTask} />
      )}

      <Popover
        open={Boolean(visible)}
        anchorEl={visible}
        onClose={() => setVisible(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <TaskInputForm onTaskUploaded={handleTaskUploaded} />
      </Popover>

      <Fab
        color="primary"
        aria-label="add"
        onClick={toggleTaskForm}
        style={{
          position: "fixed",
          bottom: "5%",
          right: "5%",
          backgroundColor: "#ffc300",
          color: "black",
        }}
      >
        <AddIcon />
      </Fab>
    </Grid2>
  );
};

export default App;
