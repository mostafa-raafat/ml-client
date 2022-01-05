import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// services
import useForgetPassword from 'Services/mutations/useForgetPassword';
// hooks
import useLocales from 'Hooks/useLocales';
// components
import { FormProvider, RHFTextField } from 'Components/hook-form';

// ----------------------------------------------------------------------

ForgetPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetEmail: PropTypes.func,
};

export default function ForgetPasswordForm({ onSent, onGetEmail }) {
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate, error, isLoading, isError } = useForgetPassword();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = ({ email }) => {
    mutate(
      { email },
      {
        onSuccess: () => {
          onSent();
          onGetEmail(email);
          enqueueSnackbar('Reset successfully!');
        },
        onSettled: () => reset(),
      }
    );
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {isError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {translate(`errors:${error.code}`)}
        </Alert>
      )}
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
          disabled={isLoading}
        >
          Reset Password
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
