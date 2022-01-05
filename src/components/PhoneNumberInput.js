import MuiPhoneNumber from 'material-ui-phone-number';

const PhoneNumberInput = ({ name, value, errors, setFieldValue, setFieldError, ...other }) => {
  return (
    <MuiPhoneNumber
      label="Phone"
      variant="outlined"
      defaultCountry={'eg'}
      countryCodeEditable={false}
      onlyCountries={['eg', 'eu']}
      autoComplete="phone"
      {...other}
      onChange={(v) => setFieldValue(name, v)}
      onError={(error) => error !== errors[name] && setFieldError(name, error)}
    />
  );
};

export default PhoneNumberInput;
