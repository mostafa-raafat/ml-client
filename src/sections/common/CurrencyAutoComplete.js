// next
import Image from 'next/image';
// @mui
import { Box } from '@mui/material';
import { styled } from '@mui/system';
// utils
import { currencies } from 'Utils/currencies';
// components
import AutoComplete from 'Components/autoComplete';

const StyledOption = styled(Box)(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text[active ? 'primary' : 'secondary'],
  '& > span img': { paddingRight: `${theme.spacing(2)} !important`, flexShrink: 0 },
}));

const CurrencyOption = ({ option, active = true, defaultLabel = 'Choose option', ...props }) => {
  return (
    <StyledOption active={active} {...props}>
      {option.code && (
        <Image
          src={`/currencies/${option.code.toLowerCase()}.png`}
          srcSet={`/currencies/${option.code.toLowerCase()}.png 2x`}
          alt={option.label}
          width={24}
          height={16}
        />
      )}
      {option.label || defaultLabel}
    </StyledOption>
  );
};

export default function CurrencyAutoComplete({ width = 400, currency, ...props }) {
  return (
    <AutoComplete options={currencies} width={width} OptionComponent={CurrencyOption} {...props}>
      <CurrencyOption option={currency} component="span" active={!!currency.label} defaultLabel="Choose currency" />
    </AutoComplete>
  );
}
