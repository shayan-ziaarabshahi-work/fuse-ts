import { GridActionsCellItem } from "@mui/x-data-grid";
import React from "react";
import { Visibility as VisibilityIcon } from "@mui/icons-material";

function ViewAction({ params }: any) {
  return (
    <GridActionsCellItem
      icon={<VisibilityIcon />}
      label="ویرایش"
      onClick={() => console.log()}
    />
  );
}

export default ViewAction;
