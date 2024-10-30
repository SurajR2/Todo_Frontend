import React, { useState } from "react";
import { Grid2 } from "@mui/material";
import AddButton from "./components/Button";
import TaskCard from "./components/TaskCard";

const App = () => {
  const [task, setTask] = useState(false);
  return (
    <Grid2
      container
      spacing={2}
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <AddButton
        label="+"
        id="add"
        onClick={() => {
          console.log("add button clicked");
          setTask(!task);
        }}
      />
      {task && <TaskCard />}
      <Grid2> Home</Grid2>
    </Grid2>
  );
};

export default App;
