import * as Yup from 'yup';
import { useState } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from 'Hooks/useAuth';
import useIsMountedRef from 'Hooks/useIsMountedRef';
import useLocales from 'Hooks/useLocales';
// routes
import { PATH_AUTH } from 'Routes/paths';
// components
import Iconify from 'Components/Iconify';
import { FormProvider, RHFTextField, RHFPhoneField } from 'Components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();
  const { translate } = useLocales();
  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    mobile: Yup.string().required('Phone is required').min(13, 'Too Short!').max(13, 'Too Long!'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async ({ email, password, firstName, lastName, mobile }) => {
    try {
      await register(email, password, firstName, lastName, mobile);
      router.push(PATH_AUTH.login);
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{translate(`errors:${errors.afterSubmit.code}`)}</Alert>}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="First name" autoComplete="firstName" />
          <RHFTextField name="lastName" label="Last name" autoComplete="lastName" />
        </Stack>

        <RHFTextField name="email" label="Email address" autoComplete="email" />

        <RHFPhoneField name="mobile" label="Phone number" autoComplete="mobile" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
