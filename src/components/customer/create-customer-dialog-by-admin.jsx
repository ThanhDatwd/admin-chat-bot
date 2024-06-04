import { zodResolver } from '@hookform/resolvers/zod';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
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
import { Controller, useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from 'src/api/axios';
import { customersApi } from 'src/api/customer';
import {
  OPTION_CUSTOMER,
  OPTION_DISTRICT,
  OPTION_ORGANIZATION,
  OPTION_PROVINCE,
  OPTION_VILLAGE,
} from 'src/constants/user';
import userBaseSchema, { userOrganizationSchema } from 'src/schemas/user-schema';
import { z } from 'zod';
import AutocompleteCustom from '../common/auto-complete-custom';
import { DialogCustom } from '../common/dialog-custom';
import { InputOutline } from '../common/input-outline';
import { SelectCustom } from '../common/select-custom';
import TableGroupUser from './table-group-customer';
import UploadAvatarUser from './upload-avatar-customer';
import customerSchema from 'src/schemas/customer-schema';

const CreateCustomerByAdminDialog = ({ open, onClose, onUpdate, organizations }) => {
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  const {
    control,
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
      setIsLoading(true);
      const res = await customersApi.createCustomer({
        customerName: data.customerName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        website: data.website,
        taxCode: data.taxCode,
        representative: data.representative,
      });
      console.log('ress', res);
      if (res.metadata.message === 'OK') {
        toast.success(t('Tạo mới thành công'));
      }
      onUpdate?.(data);
      reset();
      onClose();
    } catch (error) {
      console.error('Error creating bot:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open]);

  return (
    <>
      <DialogCustom
        open={open}
        onClose={onClose}
        title={t('Tạo tổ chức mới ')}
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
