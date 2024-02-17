import { ThemeProvider } from '@mui/material/styles';
import { memo } from 'react';
import { selectFuseCurrentLayoutConfig, selectNavbarTheme } from 'app/store/fuse/settingsSlice';
import { selectFuseNavbar } from 'app/store/fuse/navbarSlice';
import { useFuseSelector } from 'src/app/utils/hooks/useStore';
import NavbarStyle1 from './navbar/style-1/NavbarStyle1';
import NavbarStyle2 from './navbar/style-2/NavbarStyle2';
import NavbarStyle3 from './navbar/style-3/NavbarStyle3';
import NavbarToggleFab from '../../shared-components/NavbarToggleFab';

function NavbarWrapperLayout1() {
  const config = useFuseSelector(selectFuseCurrentLayoutConfig);
  const navbar = useFuseSelector(selectFuseNavbar);

  const navbarTheme = useFuseSelector(selectNavbarTheme);

  return (
    <>
      <ThemeProvider theme={navbarTheme}>
        <>
          {config.navbar.style === 'style-1' && <NavbarStyle1 />}
          {config.navbar.style === 'style-2' && <NavbarStyle2 />}
          {config.navbar.style === 'style-3' && <NavbarStyle3 />}
          {config.navbar.style === 'style-3-dense' && <NavbarStyle3 dense />}
        </>
      </ThemeProvider>

      {config.navbar.display && !config.toolbar.display && !navbar.open && <NavbarToggleFab />}
    </>
  );
}

export default memo(NavbarWrapperLayout1);
