import { useRef, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Avatar, Typography, ListItemText, ListItemButton, ListItemAvatar } from '@mui/material';
// utils
import { fToNow } from 'Utils/formatTime';
// _mock_
import { _contacts } from '../../../_mock';
// components
import Iconify from 'Components/Iconify';
import Scrollbar from 'Components/Scrollbar';
import MenuPopover from 'Components/MenuPopover';
import BadgeStatus from 'Components/BadgeStatus';
import { IconButtonAnimate } from 'Components/animate';

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 64;
const PADDING_ITEM = 1.5;

// ----------------------------------------------------------------------

export default function ContactsPopover() {
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
        size="large"
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <Iconify icon={'eva:people-fill'} width={20} height={20} />
      </IconButtonAnimate>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} sx={{ width: 360, p: 1 }}>
        <Typography variant="h6" sx={{ p: PADDING_ITEM }}>
          Contacts <Typography component="span">({_contacts.length})</Typography>
        </Typography>

        <Scrollbar sx={{ height: ITEM_HEIGHT * 8 }}>
          {_contacts.map((contact) => (
            <ListItemButton key={contact.id} sx={{ px: PADDING_ITEM, height: ITEM_HEIGHT, borderRadius: 1 }}>
              <ListItemAvatar sx={{ position: 'relative' }}>
                <Avatar src={contact.avatar} />
                <BadgeStatus status={contact.status} sx={{ position: 'absolute', right: 1, bottom: 1 }} />
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{ typography: 'subtitle2', mb: 0.25 }}
                secondaryTypographyProps={{ typography: 'caption' }}
                primary={contact.name}
                secondary={contact.status === 'offline' && fToNow(contact.lastActivity)}
              />
            </ListItemButton>
          ))}
        </Scrollbar>
      </MenuPopover>
    </>
  );
}
