import React, { useState } from "react";
import {
  Card,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  FormGroup,
} from "@mui/material";
import axios from "axios";

const TaskInputFrom = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({ ...task, [name]: type == "checkbox" ? checked : value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = import.meta.env.VITE_BASE_URL;
    let response = await axios.post(`${url}/task`, task);
    console.log(response.status);
  };
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 4,
        width: 600,
      }}
    >
      <form action="submit" onSubmit={handleSubmit}>
        <FormGroup sx={{ gap: 2 }}>
          <TextField
            label="Title"
            name="title"
            variant="standard"
            fullWidth
            value={task.title}
            onChange={handleChange}
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            name="description"
            value={task.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={8}
          />
          <FormControlLabel
            label="Status (complete/incomplete)"
            control={
              <Checkbox
                name="status"
                value={task.status}
                onChange={handleChange}
              />
            }
          />

          <Button variant="contained" type="submit">
            Save
          </Button>
        </FormGroup>
      </form>
    </Card>
  );
};

export default TaskInputFrom;
