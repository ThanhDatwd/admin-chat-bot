import { zodResolver } from '@hookform/resolvers/zod';
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { t } from 'i18next';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { customersApi } from 'src/api/customer';
import customerSchema from 'src/schemas/customer-schema';
import { setLoading, setRefresh } from 'src/slices/common';
import { DialogCustom } from '../common/dialog-custom';
import { InputOutline } from '../common/input-outline';

const CreateCustomerByAdminDialog = ({ open, onClose, onUpdate, customer }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.loading);
  const isRefresh = useSelector((state) => state.common.refresh);

  const theme = useTheme();
  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      email: '',
      customerName: '',
      phoneNumber: '',
      taxCode: '',
      representative: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true));

      const dataRequest = {
        customerName: data.customerName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        website: data.website,
        taxCode: data.taxCode,
        representative: data.representative,
      };

      let res = null;
      if (customer) {
        await customersApi.updateCustomer({ ...dataRequest, customerId: customer.customerId });

        toast.success(t('Cập nhật thành công'));
        dispatch(setRefresh(!isRefresh));
      } else {
        res = await customersApi.createCustomer(dataRequest);
        
        toast.success(t('Tạo mới thành công'));
        dispatch(setRefresh(!isRefresh));
      }

      onUpdate?.(data);
      reset();
      onClose();
    } catch (error) {
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

  useEffect(() => {
    if (customer) {
      setValue('customerName', customer.customerName);
      setValue('phoneNumber', customer.phoneNumber);
      setValue('email', customer.email);
      setValue('website', customer.website);
      setValue('taxCode', customer.taxCode);
      setValue('representative', customer.representative);
    }
  }, [customer, open]);

  return (
    <>
      <DialogCustom
        open={open}
        onClose={onClose}
        title={customer ? t('Cập nhật tổ chức') : t('Tạo tổ chức mới ')}
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
                {t('Huỷ')}
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
                {customer ? t('Cập nhật') : t('Tạo mới')}
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
        <Stack spacing={{ xs: 2, sm: 3 }}>
          <Box>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
            >
              <Grid
                item
                xs={12}
                md={6}
              >
                <Controller
                  name="customerName"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputOutline
                        {...field}
                        label={'Tên tổ chức'}
                        error={!!errors.customerName}
                        startAdornment={
                          <InputAdornment position="start">
                            <CorporateFareOutlinedIcon fontSize="small" />
                          </InputAdornment>
                        }
                      />
                      {errors.customerName && (
                        <Typography color="error">{errors.customerName.message}</Typography>
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
                  name="representative"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputOutline
                        {...field}
                        label={'Người đại diện'}
                        error={!!errors.representative}
                        startAdornment={
                          <InputAdornment position="start">
                            <PersonOutlineOutlinedIcon fontSize="small" />
                          </InputAdornment>
                        }
                      />
                      {errors.representative && (
                        <Typography color="error">{errors.representative.message}</Typography>
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
                md={6}
              >
                <Controller
                  name="taxCode"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputOutline
                        {...field}
                        label={'Mã số thuế'}
                        error={!!errors.taxCode}
                        startAdornment={<InputAdornment position="start">Tax</InputAdornment>}
                      />
                      {errors.taxCode && (
                        <Typography color="error">{errors.taxCode.message}</Typography>
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
                      {errors.email && (
                        <Typography color="error">{errors.email.message}</Typography>
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
                  name="website"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputOutline
                        {...field}
                        label={'Website'}
                        error={!!errors.website}
                        startAdornment={
                          <InputAdornment position="start">
                            <LanguageOutlinedIcon fontSize="small" />
                          </InputAdornment>
                        }
                      />
                      {errors.website && (
                        <Typography color="error">{errors.website.message}</Typography>
                      )}
                    </>
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </DialogCustom>
    </>
  );
};

CreateCustomerByAdminDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

export default CreateCustomerByAdminDialog;
