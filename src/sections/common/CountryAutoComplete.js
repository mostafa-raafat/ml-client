// // next
// import Image from 'next/image';
// @mui
import { Box } from '@mui/material';
import { styled } from '@mui/system';
// services
import useGetCountries from 'Services/queries/useGetCountries';
// config
import { AWS_PACKET_API } from 'Config/index';
// components
import AutoComplete from 'Components/autoComplete';
import Image from 'Components/Image';

const StyledOption = styled(Box)(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text[active ? 'primary' : 'secondary'],
  '& > span img': { paddingRight: `${theme.spacing(2)} !important`, flexShrink: 0 },
}));

const CountryOption = ({ option, active = true, defaultLabel = 'Choose option', ...props }) => {
  const name = option.name || defaultLabel;
  return (
    <StyledOption active={active} {...props}>
      {option.code && (
        <Image
          src={`${AWS_PACKET_API}/countries/${option.code.toLowerCase()}.png`}
          srcSet={`${AWS_PACKET_API}/countries/${option.code.toLowerCase()}.png 2x`}
          alt={name}
          width={24}
          height={16}
        />
      )}
      {name}
    </StyledOption>
  );
};

export default function CountryAutoComplete({ width = 400, country, helperText, error, ...props }) {
  const { isLoading, data } = useGetCountries();
  return (
    <AutoComplete options={data} loading={isLoading} width={width} OptionComponent={CountryOption} {...props}>
      <CountryOption option={country} component="span" active={!!country.name} defaultLabel="Choose country" />
    </AutoComplete>
  );
}
