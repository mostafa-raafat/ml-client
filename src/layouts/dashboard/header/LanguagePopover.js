import { useRef, useState } from 'react';
// @mui
import { MenuItem, ListItemText, Stack } from '@mui/material';
// hooks
import useLocales from 'Hooks/useLocales';
// components
import Image from 'Components/Image';
import MenuPopover from 'Components/MenuPopover';
import { IconButtonAnimate } from 'Components/animate';

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { allLang, currentLang, onChangeLang } = useLocales();

  return (
    <>
      <IconButtonAnimate
        ref={anchorRef}
        onClick={() => setOpen(true)}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && { bgcolor: 'action.selected' }),
        }}
      >
        <Image disabledEffect src={currentLang.icon} alt={currentLang.label} />
      </IconButtonAnimate>

      <MenuPopover open={open} onClose={() => setOpen(false)} anchorEl={anchorRef.current}>
        <Stack spacing={0.5} sx={{ p: 1 }}>
          {allLang.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === currentLang.value}
              onClick={() => {
                onChangeLang(option.value);
                setOpen(false);
              }}
              sx={{ height: 40, borderRadius: 1, px: 1 }}
            >
              <Image disabledEffect alt={option.label} src={option.icon} sx={{ mr: 2 }} />

              <ListItemText primaryTypographyProps={{ variant: 'body2' }}>{option.label}</ListItemText>
            </MenuItem>
          ))}
        </Stack>
      </MenuPopover>
    </>
  );
}
