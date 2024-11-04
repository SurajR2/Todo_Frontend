import React from "react";
import { Button } from "@mui/material";

const CustomButton = ({ id, label, onClick, sx }) => {
  return (
    <Button
      key={id}
      variant="contained"
      sx={{
        borderRadius: 10,
        backgroundColor: "#ffc300",
        color: "black",
        fontWeight: "bold",
        fontSize: 15,
        ...sx,
      }}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
