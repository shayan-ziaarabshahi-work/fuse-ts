import View from "./../components/table/row-actions/view";
import Edit from "./../components/table/row-actions/edit";
import Delete from "./../components/table/row-actions/delete";


export const prepareColumnsData = (data: any) => {
  const columns = data.columns ? data.columns : [];
  const newColumns = columns.map((column: any) => {
    const newColumn = { ...column };
    if (column.field === "actions") {
      newColumn.type = "actions";
      newColumn.getActions = ({ row: { actions } }: any) => {
        const newActions: any = [];
        actions.map((action: any) => {
          if (action === "edit") newActions.push(<Edit params={""} />);
          if (action === "view") newActions.push(<View params={""} />);
          if (action === "delete") newActions.push(<Delete params={""} />);
        });
        return newActions;
      };
      return newColumn;
    }
    return column;
  });
  return newColumns;
};

export const prepareRowsData = (data: any) => {
  const rows = data.rows ? data.rows : [];
  return rows;
};