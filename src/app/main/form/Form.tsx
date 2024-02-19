import { styled } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Table from "./components/Table";
// fake data
import {
  clientResourcesGridColumn,
  clientResourcesData,
} from "./mock-data/table";
import { prepareColumnsData, prepareRowsData } from "./utils/table";

function HomePage() {
  // page style
  const Root = styled(FusePageSimple)(({ theme }) => ({
    "& .FusePageSimple-header": {},
    "& .FusePageSimple-toolbar": {},
    "& .FusePageSimple-content": {},
    "& .FusePageSimple-sidebarHeader": {},
    "& .FusePageSimple-sidebarContent": {},
  }));

  //

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
          <Box className="p-24 w-full">
            <Table
              columns={prepareColumnsData(clientResourcesGridColumn)}
              rows={prepareRowsData(clientResourcesData)}
            />
          </Box>
        }
        scroll="content"
      />
    </>
  );
}

export default HomePage;
