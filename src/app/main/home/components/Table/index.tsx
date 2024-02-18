import * as React from "react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { DataGrid, GridColDef, faIR } from "@mui/x-data-grid";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";

// Create rtl cache
const cacheRtl = createCache({
  key: "data-grid-rtl-demo",
  stylisPlugins: [prefixer, rtlPlugin],
});

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "شناسه",
    width: 150,
  },
  {
    field: "name",
    headerName: "نام",
    width: 150,
  },
  {
    field: "age",
    headerName: "سن",
    valueGetter: (params) => `${params.value} سن`,
    width: 150,
  },
  {
    field: "occupation",
    headerName: "شغل",
    width: 150,
  },
  {
    field: "gender",
    headerName: "جنس",
    width: 150,
  },
];

const rows = [
  { id: 1, name: "شایان", age: 28, occupation: "برنامه نویس", gender: "مرد" },
];

export default function DataGridRTL() {
  // Inherit the theme from the docs site (dark/light mode)
  const existingTheme = useTheme();

  const theme = React.useMemo(
    () =>
      createTheme({}, faIR, existingTheme, {
        direction: "rtl",
      }),
    [existingTheme]
  );
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl" style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
          />
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}
