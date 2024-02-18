import Table from "./components/Table";
import { styled } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

function HomePage() {
  const Root = styled(FusePageSimple)(({ theme }) => ({
    "& .FusePageSimple-header": {},
    "& .FusePageSimple-toolbar": {},
    "& .FusePageSimple-content": {},
    "& .FusePageSimple-sidebarHeader": {},
    "& .FusePageSimple-sidebarContent": {},
  }));

  return (
    <>
      <Root
        header={
          <Box className="p-24">
            <Typography variant="h5" component="h1">محرمانه</Typography>
          </Box>
        }
        content={
          <Box className="p-24 w-full">
            <Table />
          </Box>
        }
        scroll="content"
      />
    </>
  );
}

export default HomePage;