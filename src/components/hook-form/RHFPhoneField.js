import PropTypes from 'prop-types';
import MuiPhoneNumber from 'material-ui-phone-number';
// form
import { useFormContext, Controller } from 'react-hook-form';

// ----------------------------------------------------------------------

RHFPhoneField.propTypes = {
  name: PropTypes.string,
};

export default function RHFPhoneField({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MuiPhoneNumber
          variant="outlined"
          defaultCountry={'eg'}
          countryCodeEditable={false}
          onlyCountries={['eg']}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...field}
          {...other}
        />
      )}
    />
  );
}
