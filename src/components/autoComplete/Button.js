import PropTypes from 'prop-types';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { ButtonBase, Typography } from '@mui/material';
// iconify
import Iconify from 'Components/Iconify';
// ----------------------------------------------------------------------

const StyledButton = styled(ButtonBase)(({ theme, width }) => ({
  display: 'flex',
  width,
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: theme.spacing(1),
  color: theme.palette.text.disabled,
  height: theme.spacing(7),
  padding: theme.spacing(0, 2),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.grey[500_32]}`,
  '& p': {
    lineHeight: 0,
  },
  '&:hover': {
    borderColor: theme.palette.grey[theme.palette.mode === 'light' ? 800 : 200],
  },
  '& svg': {
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
}));

AutoCompleteButton.propTypes = {
  children: PropTypes.node,
};

export default function AutoCompleteButton({ children, ...other }) {
  const theme = useTheme();
  return (
    <StyledButton disableRipple {...other}>
      <Typography>{children}</Typography>
      <Iconify icon="akar-icons:chevron-down" color={theme.palette.primary.main} />
    </StyledButton>
  );
}
