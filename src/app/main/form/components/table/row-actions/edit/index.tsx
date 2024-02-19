import { GridActionsCellItem } from "@mui/x-data-grid";
import React from "react";
import { Edit as EditIcon } from "@mui/icons-material";

function EditAction({ params }: any) {
  return (
    <GridActionsCellItem
      icon={<EditIcon />}
      label="ویرایش"
      onClick={() => console.log()}
    />
  );
}

export default EditAction;
