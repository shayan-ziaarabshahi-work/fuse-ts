import { styled } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { Box } from "@mui/system";
import { Button, Grid, Typography } from "@mui/material";
import Table from "app/shared-components/components/table";
import TableTopActions from "./components/table/top-actions";
import { prepareColumnsData, prepareRowsData } from "./utils/table";
import FormBuilder from "./components/form-builder";
// fake data
import { clientResourcesGridColumn, clientResourcesData, tableActions } from "./mock-data/table";
import { fieldsSchema } from './mock-data/form'
import { useEffect } from "react";
import { useFuseDispatch } from "src/app/utils/hooks/useStore";
import { getForms } from "app/store/formSlice";

function HomePage() {
  // page style
  const Root = styled(FusePageSimple)(({ theme }) => ({
    "& .FusePageSimple-header": {},
    "& .FusePageSimple-toolbar": {},
    "& .FusePageSimple-content": {},
    "& .FusePageSimple-sidebarHeader": {},
    "& .FusePageSimple-sidebarContent": {},
  }));

  const onSubmit = () => {

  }

  const dispatch = useFuseDispatch()

  useEffect(() => {
    const promise = dispatch(getForms({ page: 1 }));
    console.log(promise)
    return () => {
      promise.abort();
    };
  }, [dispatch]);

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
              <FormBuilder fieldsSchema={fieldsSchema} onSubmit={onSubmit} buttonText="ثبت"/>
            </Grid>
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
