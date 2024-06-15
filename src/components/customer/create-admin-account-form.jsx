import { zodResolver } from '@hookform/resolvers/zod';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import { Box, Button, CircularProgress, Grid, InputAdornment, Stack, Typography, useTheme } from '@mui/material';
import { t } from 'i18next';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import api from 'src/api/axios';
import { userOrganizationSchema } from 'src/schemas/user-schema';
import { setLoading } from 'src/slices/common';
import AutocompleteCustom from '../common/auto-complete-custom';
import { InputOutline } from '../common/input-outline';

const CreateAdminAccountForm = ({ open, onClose, onUpdate, organizations = [] }) => {
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.common.loading);
  const isRefresh = useSelector((state) => state.common.refresh);

  const theme = useTheme();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userOrganizationSchema),
    defaultValues: {
      customerId: '',
      email: '',
      // username: '',
      firstname: '',
      lastname: '',
      phoneNumber: '',
    },
  });
  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true));
      const res = await api.post(import.meta.env.VITE_API_AUTH_URL_8080 + 'users/customer-ad', {
        customerId: data.customerId,
        user: {
          firstname: data.firstname,
          lastname: data.lastname,
          phoneNumber: data.phoneNumber,
          email: data.email,
          // username: data.username,
        },
      });
      if (res.metadata.message === 'OK') {
        toast.success(t('Tạo mới tài khoản thành công'));
      }
      onUpdate?.(data);
      reset();
    } catch (error) {
      toast.error(error?.response?.data?.error?.message ?? t('Something wrong please try again!'));
      console.error('Error creating bot:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open]);
  return (
    <>
      <Stack
        sx={{ pb: 5 }}
        spacing={{ xs: 2, sm: 3 }}
      >
        <Box>
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
          >
            <>
              <Grid
                item
                xs={12}
              >
                <Controller
                  name="customerId"
                  control={control}
                  render={({ field }) => (
                    <>
                      <AutocompleteCustom
                        label={t('Tổ chức')}
                        placeholder="Chọn một tổ chức"
                        options={organizations}
                        value={field.value}
                        onChange={(item) => {
                          field.onChange(item.value);
                        }}
                        error={!!errors.customerId}
                      />
                      {errors.customerId && (
                        <Typography color="error">{errors.customerId.message}</Typography>
                      )}
                    </>
                  )}
                />
              </Grid>
            </>

            {selectedOrganization && (
              <>
                <Grid
                  item
                  xs={12}
                  md={6}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      component="label"
                      fontWeight={500}
                    >
                      Người đại diện:
                    </Typography>
                    <Typography
                      variant="h6"
                      gutterBottom
                      component="label"
                      fontWeight={500}
                    >
                      {selectedOrganization?.representative}
                    </Typography>
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      component="label"
                      fontWeight={500}
                    >
                      Mã số thuế:
                    </Typography>
                    <Typography
                      variant="h6"
                      gutterBottom
                      component="label"
                      fontWeight={500}
                    >
                      {selectedOrganization?.taxCode}
                    </Typography>
                  </Box>
                </Grid>
              </>
            )}

            <Grid
              item
              xs={12}
              md={6}
            >
              <Controller
                name="firstname"
                control={control}
                render={({ field }) => (
                  <>
                    <InputOutline
                      {...field}
                      label={'Họ'}
                      error={!!errors.firstname}
                    />
                    {errors.firstname && (
                      <Typography color="error">{errors.firstname.message}</Typography>
                    )}
                  </>
                )}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
            >
              <Controller
                name="lastname"
                control={control}
                render={({ field }) => (
                  <>
                    <InputOutline
                      {...field}
                      label={'Tên'}
                      error={!!errors.lastname}
                    />
                    {errors.lastname && (
                      <Typography color="error">{errors.lastname.message}</Typography>
                    )}
                  </>
                )}
              />
            </Grid>
            {/* <Grid
              item
              xs={12}
            >
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <>
                    <InputOutline
                      {...field}
                      label={'Tài khoản'}
                      placeholder={''}
                      error={!!errors.username}
                      startAdornment={
                        <InputAdornment position="start">
                          <PersonOutlineOutlinedIcon fontSize="small" />
                        </InputAdornment>
                      }
                    />
                    {errors.username && (
                      <Typography color="error">{errors.username.message}</Typography>
                    )}
                  </>
                )}
              />
            </Grid> */}

            <Grid
              item
              xs={12}
            >
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <>
                    <InputOutline
                      {...field}
                      label={'Số điện thoại'}
                      error={!!errors.phoneNumber}
                      startAdornment={
                        <InputAdornment position="start">
                          <PhoneAndroidOutlinedIcon fontSize="small" />
                        </InputAdornment>
                      }
                    />
                    {errors.phoneNumber && (
                      <Typography color="error">{errors.phoneNumber.message}</Typography>
                    )}
                  </>
                )}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <>
                    <InputOutline
                      {...field}
                      label={'Email'}
                      error={!!errors.email}
                      startAdornment={
                        <InputAdornment position="start">
                          <MailOutlineRoundedIcon fontSize="small" />
                        </InputAdornment>
                      }
                    />
                    {errors.email && <Typography color="error">{errors.email.message}</Typography>}
                  </>
                )}
              />
            </Grid>

            <Grid
              item
              xs={12}
            >
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
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '16px',
                    }}
                    onClick={handleSubmit(onSubmit)}
                  >
                    {t('Tạo mới')}
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
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </>
  );
};

CreateAdminAccountForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

export default CreateAdminAccountForm;
