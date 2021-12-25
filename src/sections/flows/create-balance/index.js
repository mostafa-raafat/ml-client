import { useState } from 'react';
// next
import Image from 'next/image';
// @mui
import { Container, Typography } from '@mui/material';
// hooks
import useSettings from 'Hooks/useSettings';
// utils
import { countries } from 'Utils/countries';
// components
import AutoComplete from 'Components/autoComplete';

export default function CreateBalance() {
  const { themeStretch } = useSettings();
  const [country, setCountry] = useState({ label: 'Choose currency', code: null });

  return (
    <Container maxWidth={themeStretch ? false : 'l'}>
      <Typography variant="subtitle1">subtitle</Typography>

      <AutoComplete options={countries} width={400} onChange={(country) => setCountry(country)}>
        {country.code && (
          <Image src={`/countries/${country.code.toLowerCase()}.svg`} alt={country.label} width={24} height={24} />
        )}
        {country.label}
      </AutoComplete>
    </Container>
  );
}
