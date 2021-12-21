import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Stack, Drawer, Button } from '@mui/material';
// hooks
import useResponsive from 'Hooks/useResponsive';
import useCollapseDrawer from 'Hooks/useCollapseDrawer';
// utils
import cssStyles from 'Utils/cssStyles';
// routes
import { PATH_DASHBOARD } from 'Routes/paths';
// config
import { DASHBOARD_NAVBAR_WIDTH, DASHBOARD_NAVBAR_COLLAPSE_WIDTH } from 'src/config';
// components
import Logo from 'Components/Logo';
import Scrollbar from 'Components/Scrollbar';
import NavSection from 'Components/nav-section';
import Link from 'Components/Link';
//
import NavbarDocs from './NavbarDocs';
import navConfig from './NavConfig';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shorter,
    }),
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardNavbar({ isOpenSidebar, onCloseSidebar }) {
  const theme = useTheme();

  const { pathname, push } = useRouter();

  const isDesktop = useResponsive('up', 'lg');

  const { isCollapse, collapseClick, collapseHover } = useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pt: 3,

          px: 2.5,
          flexShrink: 0,
          ...(isCollapse && { alignItems: 'center' }),
        }}
      >
        <Stack alignItems="center" justifyContent="space-between" spacing={2}>
          <Logo />
          <Button
            variant="contained"
            sx={{
              px: 5,
            }}
            onClick={() => push(PATH_DASHBOARD.user.sendMoney)}
          >
            Send Money
          </Button>
        </Stack>
      </Stack>

      <NavSection navConfig={navConfig} isCollapse={isCollapse} />

      <Box sx={{ flexGrow: 1 }} />

      {!isCollapse && <NavbarDocs />}
    </Scrollbar>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse ? DASHBOARD_NAVBAR_COLLAPSE_WIDTH : DASHBOARD_NAVBAR_WIDTH,
        },
        ...(collapseClick && {
          position: 'absolute',
        }),
      }}
    >
      {!isDesktop && (
        <Drawer open={isOpenSidebar} onClose={onCloseSidebar} PaperProps={{ sx: { width: DASHBOARD_NAVBAR_WIDTH } }}>
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DASHBOARD_NAVBAR_WIDTH,
              borderRightStyle: 'dashed',
              bgcolor: 'background.default',
              transition: (theme) =>
                theme.transitions.create('width', {
                  duration: theme.transitions.duration.standard,
                }),
              ...(isCollapse && {
                width: DASHBOARD_NAVBAR_COLLAPSE_WIDTH,
              }),
              ...(collapseHover && {
                ...cssStyles(theme).bgBlur(),
                boxShadow: (theme) => theme.customShadows.z24,
              }),
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
