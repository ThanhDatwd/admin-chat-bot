import { zodResolver } from '@hookform/resolvers/zod';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import {
  Box,
  Button,
  CircularProgress,
  FilledInput,
  FormControl,
  FormHelperText,
  Unstable_Grid2 as Grid,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import api from 'src/api/axios';
import { usersApi } from 'src/api/user';
import { setLoading, setRefresh } from 'src/slices/common';
import { z } from 'zod';
import UploadImage from '../base/upload-image';
import { DialogCustom } from '../common/dialog-custom';
import { uploadFile } from 'src/api/files';
import { getCurrentUser } from 'src/slices/auth';

const schema = z.object({
  firstname: z
    .string()
    .min(1, 'Vui lòng nhập họ')
    .transform((val) => val.trim())
    .refine((val) => val !== '', { message: 'Họ không hợp lệ' }),
  lastname: z
    .string()
    .min(1, 'Vui lòng nhập tên')
    .transform((val) => val.trim())
    .refine((val) => val !== '', { message: 'Tên không hợp lệ' }),
  phoneNumber: z
    .string()
    .min(1, 'Vui lòng nhập số điện thoại')
    .transform((val) => val.trim())
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
function UpdateUserDialog({ open, onClose }) {
  const currentAmin = useSelector((state) => state.auth.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  
  
  const currentAdmin = useSelector((state) => state.auth.admin);
  const isLoading = useSelector((state) => state.common.loading);
  const isRefresh = useSelector((state) => state.common.isRefresh);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
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
  const { t } = useTranslation();
  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true));
      let uploadResponse = null;
      if (file) {
        uploadResponse = await handleUploadFile(file);
      }
      console.log(uploadResponse)
      const dataRequest ={
        ...data,
        avatar:uploadResponse?.fileLink??currentAdmin?.avatarUrl??null
      }
      console.log(dataRequest)
      const response = await usersApi.UpdateUser(dataRequest);
      dispatch(getCurrentUser())
      dispatch(setRefresh(!isRefresh));
      toast.success(t('Cập nhật thành công'));
      onClose()

    } catch (error) {
      toast.error(t('Something wrong please try again!'));
      console.error('Login failed:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleUploadFile = async (file, json = null) => {
    try {
      const uploadResponse = await uploadFile({
        file: file,
        userId: currentAdmin.id,
        isPublic: false,
        jsonData: json,
      });

      return uploadResponse;
    } catch (error) {
      console.error('Error upload file:', error);
    }
  };
  useEffect(() => {
    if (currentAmin) {
      setValue('firstname', currentAmin.firstName);
      setValue('lastname', currentAmin.lastName);
      setValue('email', currentAmin.email);
      setValue('phoneNumber', currentAmin.phoneNumber);
    }
  }, [currentAmin, open]);

  return (
    <DialogCustom
      open={open}
      onClose={onClose}
      title={'Cập nhật thông tin người dùng'}
      actions={
        <>
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={1}
          >
            <Button
              color="secondary"
              onClick={() => onClose()}
            >
              Huỷ
            </Button>
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
              onClick={handleSubmit(onSubmit)}
            >
              {t('Cập nhật')}
              {isLoading && (
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
          </Stack>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={2}
        >
          <Grid
            xs={12}
            sm={6}
          >
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
          <Grid
            xs={12}
            sm={6}
          >
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
              <FormHelperText error={!!errors.lastname}>{errors.lastname?.message}</FormHelperText>
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
            <UploadImage
              file={file}
              setFile={setFile}
            />
          </Grid>
        </Grid>
      </form>
    </DialogCustom>
  );
}
export default UpdateUserDialog;
