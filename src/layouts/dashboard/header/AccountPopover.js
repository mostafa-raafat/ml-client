import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { useRef, useState } from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Divider, MenuItem, Typography, Stack, Avatar, ListItemIcon } from '@mui/material';
// components
import MenuPopover from 'Components/MenuPopover';
import { IconButtonAnimate } from 'Components/animate';
import Iconify from 'Components/Iconify';
// config
import { DASHBOARD_NAVBAR_ICON_ITEM_SIZE } from 'src/config';

// ----------------------------------------------------------------------

const ICONS = {
  details: <Iconify icon="bx:bx-user" sx={{ color: 'primary.main' }} />,
  settings: <Iconify icon="ep:setting" sx={{ color: 'primary.main' }} />,
  help: <Iconify icon="bx:bx-help-circle" sx={{ color: 'primary.main' }} />,
  logout: <Iconify icon="icon-park-outline:logout" sx={{ color: 'primary.main' }} />,
};

const MENU_OPTIONS = [
  {
    label: 'Your details',
    linkTo: '/',
    icon: ICONS.details,
  },
  {
    label: 'Settings',
    linkTo: '#',
    icon: ICONS.settings,
  },
  {
    label: 'Help center',
    linkTo: '#',
    icon: ICONS.help,
  },
];

// ----------------------------------------------------------------------

const ListItemIconStyle = styled(ListItemIcon)({
  width: DASHBOARD_NAVBAR_ICON_ITEM_SIZE,
  height: DASHBOARD_NAVBAR_ICON_ITEM_SIZE,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: -10,
  '& svg': { width: '100%', height: '100%' },
});

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButtonAnimate
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src="https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_5.jpg" alt="Rayan Moran" />
      </IconButtonAnimate>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} sx={{ width: 300 }}>
        <Box sx={{ my: 2, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            Mostafa Raafat Ismail
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            Membership number P23159796
          </Typography>
        </Box>

        <Divider />
        <Stack spacing={0.5} sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <NextLink key={option.label} href={option.linkTo}>
              <MenuItem onClick={handleClose} sx={{ typography: 'body2', py: 2, px: 2, borderRadius: 1 }}>
                {option.icon && <ListItemIconStyle>{option.icon}</ListItemIconStyle>}
                {option.label}
              </MenuItem>
            </NextLink>
          ))}
        </Stack>
        <Divider />

        <MenuItem sx={{ typography: 'body2', py: 1, px: 2, borderRadius: 1, m: 1 }}>
          <ListItemIconStyle>{ICONS.logout}</ListItemIconStyle>
          Log out
        </MenuItem>
      </MenuPopover>
    </>
  );
}
