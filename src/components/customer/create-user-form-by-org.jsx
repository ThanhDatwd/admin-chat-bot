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
  // repeatPassword: z.string().min(6, 'Please confirm your password'),
});
// .refine((data) => data.password === data.repeatPassword, {
//   message: 'Passwords do not match',
//   path: ['repeatPassword'], // Set the path to the field that should cause the error
// });
function CreateUserByOrgForm() {
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
      <Grid
        container
        spacing={2}
      >
        <Grid xs={12}>
          <FormControl fullWidth>
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
      </Grid>
    </form>
  );
}
export default CreateUserByOrgForm;
