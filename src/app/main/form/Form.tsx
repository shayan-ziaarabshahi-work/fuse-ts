import { styled } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { Box } from "@mui/system";
import { Button, Grid, Typography } from "@mui/material";
import Table from "./components/table";
import TableTopActions from "./components/table/top-actions";
import { prepareColumnsData, prepareRowsData } from "./utils/table";
// fake data
import {
  clientResourcesGridColumn,
  clientResourcesData,
  tableActions,
} from "./mock-data/table";

function HomePage() {
  // page style
  const Root = styled(FusePageSimple)(({ theme }) => ({
    "& .FusePageSimple-header": {},
    "& .FusePageSimple-toolbar": {},
    "& .FusePageSimple-content": {},
    "& .FusePageSimple-sidebarHeader": {},
    "& .FusePageSimple-sidebarContent": {},
  }));

  const handleOnClick = (type: any) => {
    console.log(type);
  };

  return (
    <>
      <Root
        header={
          <Box className="p-24">
            <Typography variant="h5" component="h1">
              فرم
            </Typography>
          </Box>
        }
        content={
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TableTopActions tableActions={tableActions} />
            </Grid>
            <Grid item xs={12} className="overflow-scroll">
              <Table
                columns={prepareColumnsData(clientResourcesGridColumn)}
                rows={prepareRowsData(clientResourcesData)}
                pageSize={5}
              />
            </Grid>
          </Grid>
        }
        scroll="content"
      />
    </>
  );
}

export default HomePage;
