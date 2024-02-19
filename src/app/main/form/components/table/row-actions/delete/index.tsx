import { GridActionsCellItem } from "@mui/x-data-grid";
import React from "react";
import { Delete as DeleteIcon } from "@mui/icons-material";

function DeleteAction({ params }: any) {
  return (
    <GridActionsCellItem
      icon={<DeleteIcon />}
      label="حذف"
      onClick={() => console.log()}
    />
  );
}

export default DeleteAction;
