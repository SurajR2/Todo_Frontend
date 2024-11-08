import { Paper, Divider, IconButton } from "@mui/material";
import React from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

const TaskCard = ({ tasks }) => {
  return (
    <>
      {tasks.map((task) => (
        <Paper
          key={task._id}
          elevation={3}
          sx={{ padding: 2, width: 600, gap: 0.5 }}
        >
          <h3>{task.title}</h3>
          <IconButton size="small" aria-label="edit" color="inherit">
            <EditRoundedIcon />
          </IconButton>
          <IconButton size="small" aria-label="delete" color="inherit">
            <DeleteForeverRoundedIcon />
          </IconButton>
          <p>{task.description}</p>
          <p style={{ opacity: 0.3, fontSize: "15px" }}>
            {task.status ? "Complete" : "Incomplete"}
          </p>
        </Paper>
      ))}
    </>
  );
};

export default TaskCard;
