import * as React from "react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import {
  DataGrid,
  GridColDef,
  faIR,
  GridActionsCellItem,
  GridRowId,
} from "@mui/x-data-grid";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import {
  Delete as DeleteIcon,
  Security as SecurityIcon,
  FileCopy as FileCopyIcon,
} from "@mui/icons-material";
import { Box } from "@mui/system";

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
  const [rows, setRows] = React.useState<Row[]>(initialRows);

  /* theme */
  const existingTheme = useTheme();
  const theme = React.useMemo(
    () =>
      createTheme({}, faIR, existingTheme, {
        direction: "rtl",
      }),
    [existingTheme]
  );

  /* actions functions */
  const deleteUser = React.useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    },
    []
  );

  const toggleCitizenship = React.useCallback(
    (id: GridRowId) => () => {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, citizenship: !row.citizenship } : row
        )
      );
    },
    []
  );

  const duplicateUser = React.useCallback(
    (id: GridRowId) => () => {
      setRows((prevRows) => {
        const rowToDuplicate = prevRows.find((row) => row.id === id)!;
        return [...prevRows, { ...rowToDuplicate, id: Date.now() }];
      });
    },
    []
  );

  /* columns */
  const columns = React.useMemo<GridColDef<Row>[]>(
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
          <GridActionsCellItem
            icon={<SecurityIcon />}
            label="تغییر تابعیت"
            onClick={toggleCitizenship(params.id)}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<FileCopyIcon />}
            label="رونویسی کاربر"
            onClick={duplicateUser(params.id)}
            showInMenu
          />,
        ],
      },
    ],
    [deleteUser, toggleCitizenship, duplicateUser]
  );

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Box dir="rtl" style={{ height: 400, width: "100%" }} className="">
          <DataGrid rows={rows} columns={columns} />
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
}
