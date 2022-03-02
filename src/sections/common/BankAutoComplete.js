// @mui
import { Avatar, Box } from '@mui/material';
import { styled } from '@mui/system';
// services
import useGetCountries from 'Services/queries/useGetCountries';
// components
import AutoComplete from 'Components/autoComplete';

const StyledOption = styled(Box)(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette.text[active ? 'primary' : 'secondary'],
  '& > span img': { paddingRight: `${theme.spacing(2)} !important`, flexShrink: 0 },
}));

const BankOption = ({
  option = { name: '', code: '', id: 0 },
  active = true,
  defaultLabel = 'Choose option',
  ...props
}) => {
  const name = option.name || defaultLabel;
  return (
    <StyledOption active={active} key={option.id} {...props}>
      {option.code && (
        <Avatar src={`/banks/${option.code.toLowerCase()}.png`} alt={name} sx={{ width: 24, height: 24 }} />
      )}
      {name}
    </StyledOption>
  );
};

export default function BankAutoComplete({ width = 400, bank, helperText, error, ...props }) {
  const banks = [
    {
      id: 1,
      code: 'cib',
      name: 'Commercial International Bank',
    },
    {
      id: 2,
      code: 'qnb',
      name: 'Qatar National Bank Al Ahli',
    },
    {
      id: 3,
      code: 'nbe',
      name: 'National Bank of Egypt',
    },
    {
      id: 4,
      code: 'eg',
      name: 'Egyptian Gulf Bank',
    },
  ];

  const isOptionEqualToValue = (option, value) => (option.id = value.id);

  return (
    <AutoComplete
      options={banks}
      width={width}
      OptionComponent={BankOption}
      isOptionEqualToValue={isOptionEqualToValue}
      {...props}
    >
      <BankOption option={bank} component="span" active={!!bank?.name} defaultLabel="Choose bank" />
    </AutoComplete>
  );
}
