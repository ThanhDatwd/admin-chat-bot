import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { t } from 'i18next';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { customersApi } from 'src/api/customer';
import contractSchema from 'src/schemas/contract-schema';
import customerConfigSchema from 'src/schemas/customer-config-schema';
import { setLoading, setRefresh } from 'src/slices/common';
import { DialogCustom } from '../common/dialog-custom';
import { InputOutline } from '../common/input-outline';

const CreateCustomerConfigDialog = ({ open, onClose, onUpdate, customer, config }) => {
  const [cleared, setCleared] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.loading);
  const isRefresh = useSelector((state) => state.common.refresh);

  const theme = useTheme();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(customerConfigSchema),
    defaultValues: {
      customerId: '',
      quota: 0,
      freeRequest: 0,
      freeTraining: 0,
    },
  });

  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true));
      const dataRequest = {
        customerId: data.customerId,
        quota: data.quota,
        freeRequest: data.freeRequest,
        freeTraining: data.freeTraining,
      };
      let res = null;

      if (config) {
        res = await customersApi.updateCustomerConfig({
          ...dataRequest,
          customerConfigId: config.id,
        });
      } else {
        res = await customersApi.createCustomerConfig(dataRequest);
      }

      if (res.metadata.message === 'OK') {
        toast.success(config ? t('Cập nhật cấu hình  thành công') : t('Tạo cấu hình  thành công'));
        dispatch(setRefresh(!isRefresh));
      }
      onUpdate?.(data);
      reset();
      onClose();
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

  useEffect(() => {
    if (customer) {
      setValue('customerId', customer.customerId);
    }
  }, [customer, open]);

  useEffect(() => {
    if (config) {
      setValue('quota', config.quota);
      setValue('customerId', config.customerId);
      setValue('freeRequest', config.freeRequest);
      setValue('feeTraining', config.feeTraining);
    }
  }, [config, open]);

  return (
    <DialogCustom
      open={open}
      onClose={onClose}
      title={config ? t('Cập nhật cấu hình ') : t('Cấu hình  ')}
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
              {config ? t('Cập nhật') : t('Tạo mới')}
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
      <>
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="label"
                    fontWeight={500}
                  >
                    Tên tổ chức:
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="label"
                    fontWeight={500}
                  >
                    {customer?.customerName}
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
                    Người đại diện:
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="label"
                    fontWeight={500}
                  >
                    {customer?.representative}
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
                    Số điện thoại :
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="label"
                    fontWeight={500}
                  >
                    {customer?.phoneNumber}
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
                    {customer?.taxCode}
                  </Typography>
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                md={4}
              >
                <Controller
                  name="quota"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputOutline
                        {...field}
                        type="number"
                        min={0}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        label={t('Hạn mức request theo ngày')}
                        error={!!errors.quota}
                      />
                      {errors.quota && (
                        <Typography color="error">{errors.quota.message}</Typography>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
              >
                <Controller
                  name="freeRequest"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputOutline
                        {...field}
                        type="number"
                        min={0}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        label={t('Số lượng qouta miễn phí')}
                        error={!!errors.freeRequest}
                      />
                      {errors.freeRequest && (
                        <Typography color="error">{errors.freeRequest.message}</Typography>
                      )}
                    </>
                  )}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
              >
                <Controller
                  name="freeTraining"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputOutline
                        {...field}
                        type="number"
                        min={0}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        label={t('Số lượng training miễn phí')}
                        error={!!errors.freeTraining}
                      />
                      {errors.freeTraining && (
                        <Typography color="error">{errors.freeTraining.message}</Typography>
                      )}
                    </>
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </>
    </DialogCustom>
  );
};

CreateCustomerConfigDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

export default CreateCustomerConfigDialog;
