import { useFuseSelector } from 'src/app/utils/hooks/useStore';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { selectContrastMainTheme } from 'app/store/fuse/settingsSlice';
import clsx from 'clsx';

function FusePageCardedSidebarContent(props) {
  const theme = useTheme();
  const contrastTheme = useFuseSelector(selectContrastMainTheme(theme.palette.primary.main));

  return (
    <FuseScrollbars enable={props.innerScroll}>
      {props.header && (
        <ThemeProvider theme={contrastTheme}>
          <div
            className={clsx(
              'FusePageCarded-sidebarHeader',
              props.variant,
              props.sidebarInner && 'FusePageCarded-sidebarHeaderInnerSidebar'
            )}
          >
            {props.header}
          </div>
        </ThemeProvider>
      )}

      {props.content && <div className="FusePageCarded-sidebarContent">{props.content}</div>}
    </FuseScrollbars>
  );
}

export default FusePageCardedSidebarContent;
