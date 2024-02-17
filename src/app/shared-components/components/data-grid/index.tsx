import { FC, memo, JSX } from 'react';
import MaterialReactTable, { MaterialReactTableProps } from 'material-react-table';
import { MRT_Localization_FA } from 'material-react-table/locales/fa';

const DataGrid: FC<MaterialReactTableProps & unknown> = (props) => {
  return (
    <MaterialReactTable localization={MRT_Localization_FA} enableTopToolbar={false} {...props} />
  );
};

export default memo(DataGrid) as <T extends Record<string, any>>(
  props: MaterialReactTableProps<T>
) => JSX.Element;
