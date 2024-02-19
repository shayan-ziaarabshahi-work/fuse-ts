import * as React from "react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { DataGrid, faIR } from "@mui/x-data-grid";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";

// Create rtl cache
const cacheRtl = createCache({
  key: "data-grid-rtl-demo",
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function DataGridRTL({ columns, rows, pageSize }: any) {
  /* theme */
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
        <Box
          dir="rtl"
          style={{ height: 400, width: "100%" }}
          sx={(theme) => ({ bgcolor: theme.palette.common.white })}
          className="rounded-16"
        >
          <DataGrid
            rows={rows}
            columns={columns}
            sx={{
              "& .MuiDataGrid-cell--textCenter": {
                justifyContent: "start",
              },
            }}
            pageSize={pageSize}
          />
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
}
