import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Divider, InputBase, Paper, Box, Typography } from '@mui/material';
// components
import Image from 'Components/Image';

// ----------------------------------------------------------------------

const RootStyle = styled(Paper)(({ theme, width }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: width,
  backgroundColor: 'transparent',
  position: 'relative',
  color: theme.palette.text.primary,
  outline: `1px solid ${theme.palette.grey[500_32]}`,
  '&:hover': {
    outline: `1px solid  ${theme.palette.grey[theme.palette.mode === 'light' ? 800 : 200]}`,
  },
  '&:focus-within': {
    outline: `2px solid  ${theme.palette.primary.main}`,
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

const InputInfoStyle = styled(Typography)(({ theme }) => ({
  paddingLeft: theme.spacing(1.5),
  backgroundColor: theme.palette.action.selected,
  borderBottomLeftRadius: theme.spacing(1),
  borderBottomRightRadius: theme.spacing(1),
}));

// ----------------------------------------------------------------------

const InputWithIcon = ({
  input: { label = '', value = '', setValue = () => {}, placeholder = '', width = '' },
  icon: { alt = '', src = '', text = '' },
  info = '',
  sx = {},
}) => (
  <RootStyle component="form" width={width} sx={sx}>
    <InputLabelStyle variant="body2" component="div">
      {label}
    </InputLabelStyle>
    <Box sx={{ display: 'flex', alignItems: 'center', mx: 1.5, mt: 1, mb: info ? 0 : 0.5 }}>
      <InputBase
        sx={{ flex: 1, fontSize: 24, width: '75%' }}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Box sx={{ display: 'flex', width: '25%', justifyContent: 'space-around', alignItems: 'center' }}>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Image src={src} alt={alt} sx={{ width: 28, height: 20 }} />
        <Typography variant="h6" component="div">
          {text}
        </Typography>
      </Box>
    </Box>
    {info && (
      <InputInfoStyle variant="body2" component="div">
        {info}
      </InputInfoStyle>
    )}
  </RootStyle>
);

// ----------------------------------------------------------------------

InputWithIcon.propTypes = {
  input: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    placeholder: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
  }).isRequired,
  icon: PropTypes.shape({
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  info: PropTypes.string,
  sx: PropTypes.object,
};

export default InputWithIcon;
