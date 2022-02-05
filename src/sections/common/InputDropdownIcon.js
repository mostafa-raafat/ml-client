import { useState } from 'react';
// @mui
import { useTheme } from '@mui/system';
import { TextField, MenuItem, IconButton, InputAdornment, Typography, Menu } from '@mui/material';
// components
import Iconify from 'Components/Iconify';

const MenuStyle = {
  overflow: 'visible',
  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
  mt: 1.5,
  '& .MuiAvatar-root': {
    width: 32,
    height: 32,
    ml: -0.5,
    mr: 1,
  },
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 0,
    right: 14,
    width: 10,
    height: 10,
    bgcolor: 'background.paper',
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 0,
  },
};

export default function InputDropdownIcon({ value = '', label = '', icon = '', dropdown = [], sx = {}, ...other }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <TextField
        variant="outlined"
        sx={sx}
        value={value}
        label={label}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton size="small" onClick={handleClick}>
                <Iconify icon={icon} sx={{ color: theme.palette.primary.main }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...other}
      />

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: MenuStyle,
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {dropdown.map(({ icon, text }, index) => (
          <MenuItem key={index}>
            <Iconify icon={icon} sx={{ mr: 1.5, color: theme.palette.primary.main }} />
            <Typography variant="body2">{text}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
