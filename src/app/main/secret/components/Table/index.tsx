import { Suspense, useMemo, useCallback, useState } from "react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { GridColDef, GridActionsCellItem, GridRowId } from "@mui/x-data-grid";
import createCache from "@emotion/cache";
import {
  Delete as DeleteIcon,
  Security as SecurityIcon,
  FileCopy as FileCopyIcon,
} from "@mui/icons-material";
import Table from "src/app/shared-components/components/table";
import { authRoles } from "src/app/auth";
import { useFuseSelector } from "src/app/utils/hooks/useStore";
import { selectUser } from "app/store/userSlice";
import useIsAuth from "src/app/auth/useIsAuth";

// Create rtl cache
const cacheRtl = createCache({
  key: "data-grid-rtl-demo",
  stylisPlugins: [prefixer, rtlPlugin],
});

// rows
const initialRows = [
  {
    id: 1,
    name: "علی احمدی",
    age: 25,
    citizenship: true,
  },
  {
    id: 2,
    name: "مصطفی محمدی",
    age: 36,
    citizenship: false,
  },
  {
    id: 3,
    name: "کاظم سعیدی",
    age: 19,
    citizenship: false,
  },
];

type Row = typeof initialRows[number];

export default function DataGridRTL() {
  
  const isAuth = useIsAuth()
  const [rows, setRows] = useState<Row[]>(initialRows);

  /* actions functions */
  const deleteUser = useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    },
    []
  );

  const toggleCitizenship = useCallback(
    (id: GridRowId) => () => {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, citizenship: !row.citizenship } : row
        )
      );
    },
    []
  );

  const duplicateUser = useCallback(
    (id: GridRowId) => () => {
      setRows((prevRows) => {
        const rowToDuplicate = prevRows.find((row) => row.id === id)!;
        return [...prevRows, { ...rowToDuplicate, id: Date.now() }];
      });
    },
    []
  );

  /* columns */
  const columns = useMemo<GridColDef<Row>[]>(
    () => [
      { field: "name", headerName: "نام", type: "string" },
      { field: "age", headerName: "سن", type: "number" },
      {
        field: "citizenship",
        headerName: "تابعیت",
        type: "boolean",
        width: 120,
      },
      {
        field: "actions",
        headerName: "عملیات",
        type: "actions",
        width: 80,
        getActions: (params: { id: GridRowId }) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteUser(params.id)}
          />,
          ...(isAuth(authRoles.admin)
            ? [
                <GridActionsCellItem
                  icon={<SecurityIcon />}
                  label="تغییر تابعیت"
                  onClick={toggleCitizenship(params.id)}
                  showInMenu
                />,
              ]
            : []),
          <GridActionsCellItem
            icon={<FileCopyIcon />}
            label="رونویسی کاربر"
            onClick={duplicateUser(params.id)}
            showInMenu
          />,
        ],
      },
    ],
    [deleteUser, toggleCitizenship, duplicateUser, isAuth(authRoles.admin)]
  );

  return <Table rows={rows} columns={columns} />;
}
