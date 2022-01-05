// next
import Image from 'next/image';
// @mui
import { Box, TextField, Stack } from '@mui/material';
import { styled } from '@mui/system';
// utils
import { countries } from 'Utils/countries';
// components
import AutoComplete from 'Components/autoComplete';

const StyledOption = styled(Box)(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text[active ? 'primary' : 'secondary'],
  '& > span img': { paddingRight: `${theme.spacing(2)} !important`, flexShrink: 0 },
}));

const CountryOption = ({ option, active = true, defaultLabel = 'Choose option', ...props }) => {
  return (
    <StyledOption active={active} {...props}>
      {option.code && (
        <Image
          src={`/countries/${option.code.toLowerCase()}.svg`}
          srcSet={`/countries/${option.code.toLowerCase()}.png 2x`}
          alt={option.label}
          width={24}
          height={16}
        />
      )}
      {option.label + ' +' + option.phone || defaultLabel}
    </StyledOption>
  );
};

export default function CountryAutoComplete({ width = 400, country, helperText, error, ...props }) {
  return (
    <Stack direction="row" justifyContent={'flex-end'} alignItems={'flex-end'} spacing={2}>
      <AutoComplete options={countries} ButtonWidth={85} dropDownWidth={400} OptionComponent={CountryOption}>
        <Image
          src={`/countries/${country.code.toLowerCase()}.svg`}
          srcSet={`/countries/${country.code.toLowerCase()}.png 2x`}
          alt={country.label}
          width={24}
          height={16}
        />
      </AutoComplete>
      <TextField
        fullWidth
        autoComplete="phone"
        type="number"
        label="Phone number"
        error={error}
        helperText={helperText}
        {...props}
      />
    </Stack>
  );
}
