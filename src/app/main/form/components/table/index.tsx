import React from "react";
import Table from "app/shared-components/components/table";

function InPageTable({ rows, columns, ...res }: any) {
  return (
    <Table
      rows={rows}
      columns={columns}
      {...res}
    />
  );
}

export default InPageTable;
