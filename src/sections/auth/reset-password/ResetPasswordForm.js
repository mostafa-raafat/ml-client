import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
// next
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Alert, InputAdornment, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// services
import useResetPassword from 'Services/mutations/useResetPassword';
// hooks
import useLocales from 'Hooks/useLocales';
// routes
import { PATH_AUTH } from 'Routes/paths';
// components
import { FormProvider, RHFTextField } from 'Components/hook-form';
import Iconify from 'Components/Iconify';

// ----------------------------------------------------------------------

export default function ResetPasswordForm() {
  const { translate } = useLocales();
  const { push, query } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, error, isLoading, isError } = useResetPassword();

  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = ({ password, confirmPassword }) => {
    mutate(
      { password, confirmPassword, token: query.token },
      {
        onSuccess: () => {
          enqueueSnackbar('Reset successfully!');
          push(PATH_AUTH.login);
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
        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField name="confirmPassword" label="Confirm Password" type="password" autoComplete="confirm-password" />

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
