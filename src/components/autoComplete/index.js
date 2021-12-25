import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Popper, ClickAwayListener, Autocomplete, InputBase, Box, ButtonBase, Typography } from '@mui/material';
// iconify
import Iconify from 'Components/Iconify';
//
import PopperComponent from './Popper';

// ----------------------------------------------------------------------

const StyledPopper = styled(Popper)(({ theme, width }) => ({
  border: `1px solid ${theme.palette.grey[theme.palette.mode === 'light' ? 200 : 900]}`,
  borderRadius: theme.shape.borderRadius,
  top: `-${theme.spacing(7)} !important`,
  width: width,
  zIndex: theme.zIndex.modal,
  backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: 10,
  width: '100%',
  backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 0 : 800],
  borderBottom: `1px solid ${theme.palette.grey[theme.palette.mode === 'light' ? 200 : 700]}`,
  borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
  '& input': {
    borderRadius: 4,
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 900],
    padding: 8,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
  },
}));

const Button = styled(ButtonBase)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: theme.spacing(1),
  color: theme.palette.text.disabled,
  height: theme.spacing(6.6),
  padding: theme.spacing(0, 2),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.grey[500_32]}`,
  '&:hover': {
    borderColor: theme.palette.grey[theme.palette.mode === 'light' ? 800 : 200],
  },
  '& svg': {
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
}));

AutoComplete.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  width: PropTypes.number,
  children: PropTypes.node,
};

export default function AutoComplete({ options = [], width = 400, children, onChange }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const theme = useTheme();

  const handleClose = () => {
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'autoComplete-label' : undefined;

  return (
    <Box width={width}>
      <Button onClick={handleClick}>
        <Typography>{children}</Typography>
        <Iconify icon="akar-icons:chevron-down" color={theme.palette.primary.main} />
      </Button>

      <StyledPopper id={id} open={open} anchorEl={anchorEl} width={width}>
        <ClickAwayListener onClickAway={handleClose}>
          <Autocomplete
            open
            onClose={(event, reason) => {
              if (reason === 'escape') {
                handleClose();
              }
            }}
            value={value}
            onChange={(event, newValue, reason) => {
              if (event.type === 'keydown' && event.key === 'Backspace' && reason === 'removeOption') {
                return;
              }
              setValue(newValue);
              onChange(newValue);
            }}
            disableCloseOnSelect
            PopperComponent={(props) => <PopperComponent width={width} {...props} />}
            renderTags={() => null}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <img
                  loading="lazy"
                  width="24"
                  src={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w80/${option.code.toLowerCase()}.png 2x`}
                  alt=""
                />
                {option.label}
              </Box>
            )}
            options={options}
            getOptionLabel={(option) => option.label}
            onInputChange={(test) => setInputValue(test?.target?.value || '')}
            inputValue={inputValue}
            renderInput={(params) => (
              <StyledInput ref={params.InputProps.ref} inputProps={params.inputProps} autoFocus placeholder="Search" />
            )}
          />
        </ClickAwayListener>
      </StyledPopper>
    </Box>
  );
}
