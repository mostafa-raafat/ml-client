import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';

// ----------------------------------------------------------------------

const StyledAutocompletePopper = styled('div')(({ theme, width }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    width: width - 2,
    borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    top: '100px',
    padding: theme.spacing(1, 0),
    scrollbarWidth: 'thin',
    scrollbarColor: `${theme.palette.grey[600]} ${theme.palette.grey[theme.palette.mode === 'light' ? 0 : 800]}`,
    '&::-webkit-scrollbar': {
      width: theme.spacing(1.6),
    },
    '&::-webkit-scrollbar-track': {
      borderLeft: `1px solid ${theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]}`,
      borderRadius: theme.shape.borderRadius,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: theme.shape.borderRadius,
      border: `2px solid transparent`,
      backgroundClip: 'content-box',
      backgroundColor: theme.palette.grey[600],
    },
    [`& .${autocompleteClasses.option}`]: {
      padding: theme.spacing(1.8, 1),
      margin: theme.spacing(0, 1),
      '&[data-focus="true"], &[data-focus="true"][aria-selected="true"]': {
        backgroundColor: theme.palette.action.hover,
      },
      '&[aria-selected="true"]': {
        backgroundColor: `${theme.palette.primary[theme.palette.mode === 'light' ? 'lighter' : 'darker']} !important`,
      },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: 'relative',
  },
}));

PopperComponent.propTypes = {
  anchorEl: PropTypes.any,
  disablePortal: PropTypes.bool,
  open: PropTypes.bool.isRequired,
};

export default function PopperComponent(props) {
  // eslint-disable-next-line no-unused-vars
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}
