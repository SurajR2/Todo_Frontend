import {
  Paper,
  IconButton,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
  Box,
  TextField,
  ClickAwayListener,
} from "@mui/material";
import React, { useState } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import TaskInputForm from "./TaskInputForm";
import axios from "axios";

const TaskCard = ({ tasks, onTaskUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingDescription, setEditingDescription] = useState("");

  const handleTaskEdit = (task) => {
    setIsEditing(true);
    setSelectedTask(task);
    setEditingTitle(task.title);
    setEditingDescription(task.description);
  };

  const handleTaskDelete = async (task) => {
    let response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/task/${task._id}`
    );
    if (response.status === 200) {
      onTaskUpdate();
      setSelectedTask(null);
    }
  };

  const handleStatusUpdate = async (task) => {
    let response = await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/task/${task._id}/status`,
      { ...task, status: !task.status }
    );
    if (response.status === 200) {
      onTaskUpdate();
    }
  };

  const handleTitleChange = (e) => setEditingTitle(e.target.value);
  const handleDescriptionChange = (e) => setEditingDescription(e.target.value);

  const handleSaveEdit = async () => {
    const updatedTask = {
      ...selectedTask,
      title: editingTitle,
      description: editingDescription,
    };
    let response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/task/${selectedTask._id}`,
      updatedTask
    );
    if (response.status === 200) {
      onTaskUpdate();
      setIsEditing(false);
      setSelectedTask(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    }
  };

  return (
    <>
      {tasks.map((task) => (
        <Paper
          key={task._id}
          elevation={4}
          sx={{
            padding: 2,
            width: 600,
            gap: 1,
            mb: 3,
            borderRadius: 2,
            backgroundColor: task.status ? "#f0f8ff" : "#fff",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              {isEditing && selectedTask?._id === task._id ? (
                <TextField
                  variant="outlined"
                  value={editingTitle}
                  onChange={handleTitleChange}
                  onKeyPress={handleKeyPress}
                  fullWidth
                  autoFocus
                  sx={{ mb: 1 }}
                />
              ) : (
                <Typography
                  variant="h6"
                  color="textPrimary"
                  sx={{ fontWeight: "bold" }}
                  onClick={() => handleTaskEdit(task)}
                  style={{ cursor: "pointer" }}
                >
                  {task.title}
                </Typography>
              )}
            </Box>

            <Box display="flex" alignItems="center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={task.status}
                    onChange={() => handleStatusUpdate(task)}
                    color="success"
                  />
                }
                label={task.status ? "Complete" : "Incomplete"}
                sx={{ mr: 1 }}
              />

              <IconButton
                size="small"
                aria-label="edit"
                color="primary"
                onClick={() => handleTaskEdit(task)}
              >
                <EditRoundedIcon />
              </IconButton>

              <IconButton
                size="small"
                aria-label="delete"
                color="error"
                onClick={() => handleTaskDelete(task)}
              >
                <DeleteForeverRoundedIcon />
              </IconButton>
            </Box>
          </Box>

          <Divider sx={{ my: 1 }} />

          <Box>
            {isEditing && selectedTask?._id === task._id ? (
              <TextField
                variant="outlined"
                value={editingDescription}
                onChange={handleDescriptionChange}
                onKeyPress={handleKeyPress}
                fullWidth
                multiline
                rows={4}
                sx={{ mb: 2 }}
              />
            ) : (
              <Typography
                variant="body1"
                color="textSecondary"
                sx={{ mb: 2 }}
                onClick={() => handleTaskEdit(task)}
                style={{ cursor: "pointer" }}
              >
                {task.description}
              </Typography>
            )}
          </Box>
        </Paper>
      ))}
    </>
  );
};

export default TaskCard;
