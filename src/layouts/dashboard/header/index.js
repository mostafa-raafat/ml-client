import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar } from '@mui/material';
// hooks
import useOffSetTop from 'Hooks/useOffSetTop';
import useResponsive from 'Hooks/useResponsive';
import useCollapseDrawer from 'Hooks/useCollapseDrawer';
// utils
import cssStyles from 'Utils/cssStyles';
// config
import {
  DASHBOARD_NAVBAR_WIDTH,
  DASHBOARD_HEADER_MOBILE,
  DASHBOARD_HEADER_DESKTOP,
  DASHBOARD_NAVBAR_COLLAPSE_WIDTH,
} from 'src/config';
// components
import Iconify from 'Components/Iconify';
import { IconButtonAnimate } from 'Components/animate';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isCollapse',
})(({ isCollapse, theme }) => ({
  boxShadow: 'none',
  ...cssStyles(theme).bgBlur(),
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DASHBOARD_NAVBAR_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${DASHBOARD_NAVBAR_COLLAPSE_WIDTH}px)`,
    }),
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: DASHBOARD_HEADER_MOBILE,
  transition: theme.transitions.create('min-height', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(0, 5),
    minHeight: DASHBOARD_HEADER_DESKTOP,
  },
}));

// ----------------------------------------------------------------------

DashboardHeader.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardHeader({ onOpenSidebar }) {
  const { isCollapse } = useCollapseDrawer();

  const isOffset = useOffSetTop(DASHBOARD_HEADER_DESKTOP);

  const isDesktop = useResponsive('up', 'lg');

  return (
    <RootStyle isCollapse={isCollapse}>
      <ToolbarStyle
        sx={{
          ...(isOffset && {
            minHeight: { md: DASHBOARD_HEADER_DESKTOP - 16 },
          }),
        }}
      >
        {!isDesktop && (
          <IconButtonAnimate onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Iconify icon="eva:menu-2-fill" />
          </IconButtonAnimate>
        )}

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <LanguagePopover />
          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
