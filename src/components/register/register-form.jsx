import { zodResolver } from '@hookform/resolvers/zod';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  Divider,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Unstable_Grid2 as Grid,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import api from 'src/api/axios';
import { ButtonIcon } from 'src/components/base/styles/button-icon';
import { setAmin } from 'src/slices/auth';
import { setLoading } from 'src/slices/common';
import { z } from 'zod';

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  username: z.string().min(1, 'User name is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email({ message: 'Invalid email address' })
    .regex(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/, { message: 'Invalid email address' }),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  // repeatPassword: z.string().min(6, 'Please confirm your password'),
});
// .refine((data) => data.password === data.repeatPassword, {
//   message: 'Passwords do not match',
//   path: ['repeatPassword'], // Set the path to the field that should cause the error
// });
function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.loading);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      phoneNumber: '',
      email: '',
      password: '',
      // repeatPassword: '',
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const password = watch('password');
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const { t } = useTranslation();
  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true));
      const requestData = {
        firstname: data.firstName,
        lastname: data.lastName,
        username: data.username,
        phoneNumber: data.phoneNumber,
        email: data.email,
        password: data.password,
      };

      const response = await api.post(
        import.meta.env.VITE_API_AUTH_URL_8080 + 'auth/register',
        requestData
      );

      toast.success(t('Login successfully'));

      navigate('/login');
    } catch (error) {
      toast.error(error?.response?.data?.error?.message ?? t('Something wrong please try again!'));
      console.error('Login failed:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        py={{
          xs: 2,
          sm: 3,
        }}
        mx={{
          xl: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            align="center"
            variant="h3"
            gutterBottom
          >
            Create new account
          </Typography>
          <Typography
            align="center"
            variant="h6"
            fontWeight={400}
          >
            Join our platform by creating a new account for exclusive access
          </Typography>
        </Container>
        <Stack
          mt={{
            xs: 2,
            sm: 3,
          }}
          justifyContent="center"
          alignItems="center"
          spacing={{
            xs: 2,
            sm: 3,
          }}
        >
          <Container maxWidth="sm">
            <Grid
              container
              spacing={2}
            >
              <Grid xs={12}>
                <FormControl
                  fullWidth
                  size="small"
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="label"
                    htmlFor="firstname-input"
                    fontWeight={500}
                  >
                    Full name
                  </Typography>
                  <Grid
                    container
                    spacing={{
                      xs: 2,
                      md: 3,
                    }}
                  >
                    <Grid
                      xs={12}
                      sm={6}
                    >
                      <FilledInput
                        error={!!errors.firstName}
                        hiddenLabel
                        {...register('firstName')}
                        id="firstname-input"
                        fullWidth
                        size="small"
                        placeholder="First name"
                      />

                      <FormHelperText error={!!errors.firstName}>
                        {errors.firstName?.message}
                      </FormHelperText>
                    </Grid>
                    <Grid
                      xs={12}
                      sm={6}
                    >
                      <FilledInput
                        error={!!errors.lastName}
                        hiddenLabel
                        {...register('lastName')}
                        fullWidth
                        size="small"
                        id="lastname-input"
                        placeholder="Last name"
                      />
                      <FormHelperText error={!!errors.lastName}>
                        {errors.lastName?.message}
                      </FormHelperText>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <FormControl
                  fullWidth
                  error={!!errors.username}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="label"
                    htmlFor="username-input"
                    fontWeight={500}
                  >
                    User name
                  </Typography>
                  <FilledInput
                    {...register('username')}
                    type="username"
                    hiddenLabel
                    size="small"
                    id="username-input"
                    placeholder="Write your username"
                    startAdornment={
                      <InputAdornment position="start">
                        <PersonOutlineOutlinedIcon fontSize="small" />
                      </InputAdornment>
                    }
                  />
                  <FormHelperText>{errors.username?.message}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <FormControl
                  fullWidth
                  error={!!errors.email}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="label"
                    htmlFor="email-input"
                    fontWeight={500}
                  >
                    Email
                  </Typography>
                  <FilledInput
                    {...register('email')}
                    type="email"
                    hiddenLabel
                    size="small"
                    id="email-input"
                    placeholder="Write your email"
                    startAdornment={
                      <InputAdornment position="start">
                        <MailOutlineRoundedIcon fontSize="small" />
                      </InputAdornment>
                    }
                  />
                  <FormHelperText>{errors.email?.message}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <FormControl
                  fullWidth
                  error={!!errors.phoneNumber}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="label"
                    htmlFor="phoneNumber-input"
                    fontWeight={500}
                  >
                    Phone number
                  </Typography>
                  <FilledInput
                    {...register('phoneNumber')}
                    type="phoneNumber"
                    hiddenLabel
                    size="small"
                    id="phoneNumber-input"
                    placeholder="Write your username"
                    startAdornment={
                      <InputAdornment position="start">
                        <PhoneAndroidOutlinedIcon fontSize="small" />
                      </InputAdornment>
                    }
                  />
                  <FormHelperText>{errors.phoneNumber?.message}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <FormControl
                  fullWidth
                  error={!!errors.password}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="label"
                    htmlFor="password-input"
                    fontWeight={500}
                  >
                    Password
                  </Typography>
                  <FilledInput
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    hiddenLabel
                    size="small"
                    id="password-input"
                    placeholder="Write your password"
                    endAdornment={
                      <InputAdornment position="end">
                        <ButtonIcon
                          size="small"
                          variant="outlined"
                          color="secondary"
                          sx={{
                            mr: -0.8,
                          }}
                          onClick={handlePasswordVisibility}
                        >
                          {showPassword ? (
                            <VisibilityOff fontSize="inherit" />
                          ) : (
                            <Visibility fontSize="inherit" />
                          )}
                        </ButtonIcon>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText>{errors.password?.message}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <Box
                  alignItems="center"
                  display="flex"
                  justifyContent="space-between"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="terms"
                        color="primary"
                      />
                    }
                    label={
                      <>
                        <Typography variant="body1">{t('Keep me signed in')}</Typography>
                      </>
                    }
                  />
                  {/* <Link
                    href=""
                    onClick={(e) => e.preventDefault()}
                    underline="hover"
                  >
                    {t('Recover password')}
                  </Link> */}
                </Box>
              </Grid>
              <Grid xs={12}>
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  fullWidth
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                  }}
                >
                  Sign up
                  {!isLoading && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '16px',
                      }}
                      color="common.white"
                    >
                      {' '}
                      <CircularProgress
                        style={{ height: '20px', width: '20px' }}
                        color={'inherit'}
                      />
                    </Box>
                  )}
                </Button>
              </Grid>
              <Grid
                xs={12}
                textAlign="center"
              >
                <Typography
                  component="span"
                  color="text.secondary"
                >
                  Already a Member?
                </Typography>{' '}
                <Link
                  href="/login"
                  underline="hover"
                  fontWeight={500}
                >
                  Sign in here
                </Link>
              </Grid>
            </Grid>
          </Container>
        </Stack>
      </Box>
    </form>
  );
}
export default RegisterForm;
