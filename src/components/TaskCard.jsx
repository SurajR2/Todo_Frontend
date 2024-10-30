import React from "react";
import { Card, TextField, Box } from "@mui/material";
const TaskCard = () => {
  return (
    <Card sx={{ display: "flex", flexDirection: "column", gap: 4, padding: 4 }}>
      <TextField label="Title" variant="standard" />
      <TextField
        label="Description"
        variant="outlined"
        sx={{
          width: 200,
          height: 600,
        }}
      />
    </Card>
  );
};

export default TaskCard;
