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
  Typography,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const TaskInputForm = ({ onTaskUploaded, taskData = {} }) => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [error, setError] = useState(false);

  const [task, setTask] = useState({
    title: taskData.title || "",
    description: taskData.description || "",
    status: taskData.status || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({ ...task, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const url = taskData._id
        ? `${import.meta.env.VITE_BASE_URL}/task/${taskData._id}`
        : `${import.meta.env.VITE_BASE_URL}/task`;
      const method = taskData._id ? "put" : "post";
      const response = await axios[method](url, task);

      if (response.status === 201 || response.status === 200) {
        setOpenSnackBar(true);
        onTaskUploaded();
        setTask({ title: "", description: "", status: false });
      }
    } catch (error) {
      setError(true);
      console.log("error", error);
    }
  };

  const handleCloseSnackBar = () => setOpenSnackBar(false);
  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleCloseSnackBar}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 4,
        width: 600,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" component="div" sx={{ mb: 2 }}>
        {taskData._id ? "Update Task" : "Add New Task"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <FormGroup sx={{ gap: 2 }}>
          <TextField
            label="Title"
            name="title"
            variant="standard"
            fullWidth
            value={task.title}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />

          <Divider sx={{ my: 1 }} />

          <TextField
            label="Description"
            variant="outlined"
            name="description"
            value={task.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />

          <FormControlLabel
            label="Status"
            control={
              <Checkbox
                name="status"
                checked={task.status}
                onChange={handleChange}
              />
            }
            sx={{ mb: 2 }}
          />

          <Button variant="contained" type="submit" color="primary">
            {taskData._id ? "Update" : "Save"}
          </Button>
        </FormGroup>
      </form>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
        message={`Task ${taskData._id ? "Updated" : "Created"} Successfully`}
        action={action}
      />
    </Card>
  );
};

export default TaskInputForm;
