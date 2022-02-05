// next
import Image from 'next/image';
// @mui
import { Box } from '@mui/material';
import { styled } from '@mui/system';
// services
import useGetCurrencies from 'Services/query/useGetCurrencies';
// config
import { AWS_PACKET_API } from 'Config/index';
// components
import AutoComplete from 'Components/autoComplete';

const StyledOption = styled(Box)(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text[active ? 'primary' : 'secondary'],
  '& > span img': { paddingRight: `${theme.spacing(2)} !important`, flexShrink: 0 },
}));

const CurrencyOption = ({ option, active = true, defaultLabel = 'Choose option', ...props }) => {
  const name = option ? option.name : defaultLabel;

  return (
    <StyledOption active={active} {...props}>
      {option?.code && (
        <Image
          src={`${AWS_PACKET_API}/currencies/${option.code.toLowerCase()}.png`}
          srcSet={`${AWS_PACKET_API}/currencies/${option.code.toLowerCase()}.png 2x`}
          alt={name}
          width={24}
          height={16}
        />
      )}
      {name}
    </StyledOption>
  );
};

export default function CurrencyAutoComplete({ width = 400, currency, ...props }) {
  const { isLoading, data = [] } = useGetCurrencies();
  const option = data.find((item) => item.code === currency.code);

  const isOptionEqualToValue = (option, value) => option.code === value.code;

  return (
    <AutoComplete
      options={data}
      loading={isLoading}
      width={width}
      OptionComponent={CurrencyOption}
      isOptionEqualToValue={isOptionEqualToValue}
      {...props}
    >
      <CurrencyOption option={option} component="span" active={!!currency} defaultLabel="Choose currency" />
    </AutoComplete>
  );
}
