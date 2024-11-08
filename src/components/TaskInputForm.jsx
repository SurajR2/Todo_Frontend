import React, { useState } from "react";
import {
  Card,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Snackbar,
  FormGroup,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import axios from "axios";

const TaskInputFrom = ({ onTaskUploaded }) => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [error, setError] = useState(false);

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
    setError(false);
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/task`,
        task
      );
      if (response.status === 201) {
        setOpenSnackBar(true);
        onTaskUploaded();
        setTask({ title: "", description: "", status: false });
      }
    } catch (error) {
      setError(true);
      console.log("error", error);
    }
  };

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackBar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
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
                checked={task.status}
                onChange={handleChange}
              />
            }
          />

          <Button variant="contained" type="submit">
            Save
          </Button>
        </FormGroup>
      </form>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
        message="Task Uploaded Successfully"
        action={action}
      />
    </Card>
  );
};

export default TaskInputFrom;
