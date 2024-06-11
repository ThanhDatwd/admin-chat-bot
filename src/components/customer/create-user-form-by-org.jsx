import { zodResolver } from '@hookform/resolvers/zod';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import {
  Box,
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  Unstable_Grid2 as Grid,
  InputAdornment,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import api from 'src/api/axios';
import { setLoading } from 'src/slices/common';
import { z } from 'zod';

const schema = z.object({
  firstname: z.string().min(1, 'Vui lòng nhập họ').transform((val) => val.trim())
  .refine((val) => val !== '', { message: 'Họ không hợp lệ' }),
  lastname: z.string().min(1, 'Vui lòng nhập tên').transform((val) => val.trim())
  .refine((val) => val !== '', { message: 'Tên không hợp lệ' }),
  phoneNumber: z.string().min(1, 'Vui lòng nhập số điện thoại').transform((val) => val.trim())
  .refine((val) => val !== '', { message: 'Số điện thoại không hợp lệ' }),
  email: z
    .string()
    .min(1, 'Vui lòng nhập email')
    .email({ message: 'Email không hợp lệ' })
    .regex(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/, { message: 'Email không hợp lệ' }),
  // repeatPassword: z.string().min(6, 'Please confirm your password'),
});
// .refine((data) => data.password === data.repeatPassword, {
//   message: 'Passwords do not match',
//   path: ['repeatPassword'], // Set the path to the field that should cause the error
// });
function CreateUserByOrgForm({onUpdate}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.loading);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstname: '',
      lastname: '',
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
      onUpdate(data)
      reset();
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
        <Grid xs={12}
                sm={6}>
          <FormControl fullWidth>
            <Typography
              variant="h6"
              gutterBottom
              component="label"
              htmlFor="firstname-input"
              fontWeight={500}
            >
              Họ
            </Typography>
                <FilledInput
                  error={!!errors.firstname}
                  hiddenLabel
                  {...register('firstname')}
                  id="firstname-input"
                  fullWidth
                  placeholder="First name"
                />

                <FormHelperText error={!!errors.firstname}>
                  {errors.firstname?.message}
                </FormHelperText>
          </FormControl>
        </Grid>
        <Grid xs={12}
                sm={6}>
          <FormControl fullWidth>
            <Typography
              variant="h6"
              gutterBottom
              component="label"
              htmlFor="firstname-input"
              fontWeight={500}
            >
              Tên
            </Typography>
             
                <FilledInput
                  error={!!errors.lastname}
                  hiddenLabel
                  {...register('lastname')}
                  fullWidth
                  id="lastname-input"
                  placeholder="Last name"
                />
                <FormHelperText error={!!errors.lastname}>
                  {errors.lastname?.message}
                </FormHelperText>
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
             Số điện thoại
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
        <Grid xs={12}>
          <Box
            display={'flex'}
            justifyContent={'flex-end'}
          >
            <Button
              variant="text"
              type="submit"
              onClick={handleSubmit(onSubmit)}
              startIcon={<AddOutlinedIcon fontSize="small" />}
            >
              Thêm người dùng
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}
export default CreateUserByOrgForm;
