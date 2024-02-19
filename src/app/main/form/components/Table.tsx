import React from "react";
import Table from "app/shared-components/components/table";

function InPageTable({ rows, columns }: any) {
  return (
    <Table
      rows={rows}
      columns={columns}
      pageSize={5}
    />
  );
}

export default InPageTable;
