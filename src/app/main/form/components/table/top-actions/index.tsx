import { Button } from "@mui/material";


function TableTopActions({ tableActions }: any) {
  return (
    <>
      {tableActions?.map((item: any, index: any) => (
        <Button key={index} variant="contained" endIcon={item.icon} className="ml-10 mb-10">
          {item.title}
        </Button>
      ))}
    </>
  );
}

export default TableTopActions;
