import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Stack, Drawer, Button } from '@mui/material';
// hooks
import useResponsive from 'Hooks/useResponsive';
import useCollapseDrawer from 'Hooks/useCollapseDrawer';
// utils
import cssStyles from 'Utils/cssStyles';
// config
import { AWS_PACKET_API, NAVBAR } from 'Config/index';
// services
import useGetBalances from 'Services/query/useGetBalances';
// routes
import { PATH_DASHBOARD } from 'Routes/paths';
// components
import Image from 'Components/Image';
import Logo from 'Components/Logo';
import Scrollbar from 'Components/Scrollbar';
import { NavSectionVertical } from 'Components/nav-section';
//
import navConfig from './NavConfig';
import NavbarDocs from './NavbarDocs';
import CollapseButton from './CollapseButton';
import { Icon } from '@iconify/react';

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

NavbarVertical.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function NavbarVertical({ isOpenSidebar, onCloseSidebar }) {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'lg');

  const { pathname, push } = useRouter();

  const { isCollapse, collapseClick, collapseHover, onToggleCollapse, onHoverEnter, onHoverLeave } =
    useCollapseDrawer();

  const { data = [] } = useGetBalances();

  const userNavConfig = useMemo(() => {
    const configItems = data.map(({ amount, currencyCode, balanceId }) => ({
      title: `${amount} ${currencyCode}`,
      path: `${PATH_DASHBOARD.user.balances}/${balanceId}`,
      query: { amount, code: currencyCode },
      icon: (
        <Image
          key={balanceId}
          src={`${AWS_PACKET_API}/currencies/${currencyCode.toLowerCase()}.png`}
          alt={currencyCode}
          width={36}
          height={28}
        />
      ),
    }));
    const addBalance = {
      title: 'Open a balance',
      path: PATH_DASHBOARD.user.balances,
      icon: <Icon icon="akar-icons:plus" />,
    };
    navConfig['balances']['items'] = [...configItems, addBalance];
    return Object.values(navConfig);
  }, [data]);

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
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
          pb: 2,
          px: 2.5,
          flexShrink: 0,
          ...(isCollapse && { alignItems: 'center' }),
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Logo />

          {isDesktop && !isCollapse && (
            <CollapseButton onToggleCollapse={onToggleCollapse} collapseClick={collapseClick} />
          )}
        </Stack>

        <Stack alignItems="center" justifyContent="space-between" spacing={2}>
          <Button
            variant="contained"
            sx={{
              px: 5,
            }}
            onClick={() => push(PATH_DASHBOARD.user.balances)}
          >
            Send Money
          </Button>
        </Stack>
      </Stack>

      <NavSectionVertical navConfig={userNavConfig} isCollapse={isCollapse} />

      <Box sx={{ flexGrow: 1 }} />

      {!isCollapse && <NavbarDocs />}
    </Scrollbar>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH : NAVBAR.DASHBOARD_WIDTH,
        },
        ...(collapseClick && {
          position: 'absolute',
        }),
      }}
    >
      {!isDesktop && (
        <Drawer open={isOpenSidebar} onClose={onCloseSidebar} PaperProps={{ sx: { width: NAVBAR.DASHBOARD_WIDTH } }}>
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: NAVBAR.DASHBOARD_WIDTH,
              borderRightStyle: 'dashed',
              bgcolor: 'background.default',
              transition: (theme) =>
                theme.transitions.create('width', {
                  duration: theme.transitions.duration.standard,
                }),
              ...(isCollapse && {
                width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
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
