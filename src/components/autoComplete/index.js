import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Popper, ClickAwayListener, Autocomplete, InputBase, Box, Typography } from '@mui/material';
//
import AutoCompletePopper from './Popper';
import AutoCompleteButton from './Button';

// ----------------------------------------------------------------------

const StyledPopper = styled(Popper)(({ theme, width }) => ({
  border: `1px solid ${theme.palette.grey[theme.palette.mode === 'light' ? 200 : 900]}`,
  borderRadius: theme.shape.borderRadius,
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

const InputLabelStyle = styled(Typography)(({ theme }) => ({
  paddingLeft: theme.spacing(1.5),
  marginTop: theme.spacing(1),
  color: theme.palette.primary.main,
  position: 'absolute',
  top: `-${theme.spacing(2.2)}`,
  left: theme.spacing(1),
  background: theme.palette.background.default,
  padding: theme.spacing(0, 0.7),
}));

AutoComplete.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  width: PropTypes.number,
  onChange: PropTypes.func,
  children: PropTypes.node,
  OptionComponent: PropTypes.func,
  label: PropTypes.string,
  sx: PropTypes.object,
};

export default function AutoComplete({
  options = [],
  loading = false,
  ButtonWidth = 400,
  dropDownWidth = 400,
  children,
  onChange,
  OptionComponent,
  isOptionEqualToValue = () => {},
  label = '',
  sx,
  ...other
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');

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
    <Box width={ButtonWidth + 2} sx={{ ...sx, position: 'relative' }} {...other}>
      <AutoCompleteButton onClick={handleClick} width={ButtonWidth}>
        {children}
      </AutoCompleteButton>

      {label && (
        <InputLabelStyle variant="body2" component="div">
          {label}
        </InputLabelStyle>
      )}

      <StyledPopper
        id={id}
        open={open}
        anchorEl={anchorEl}
        width={dropDownWidth + 2}
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, -64],
            },
          },
        ]}
      >
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
            PopperComponent={(props) => <AutoCompletePopper width={dropDownWidth + 2} {...props} />}
            renderTags={() => null}
            renderOption={(props, option) => {
              return OptionComponent ? (
                <OptionComponent component="li" option={option} {...props} />
              ) : (
                <Box component="li" {...props}>
                  {option.name}
                </Box>
              );
            }}
            isOptionEqualToValue={isOptionEqualToValue}
            options={options}
            loading={loading}
            clearOnBlur={false}
            getOptionLabel={(option) => option.name}
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
