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
import { format, parseISO } from 'date-fns';
import { t } from 'i18next';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { customersApi } from 'src/api/customer';
import contractSchema from 'src/schemas/contract-schema';
import { DialogCustom } from '../common/dialog-custom';
import { InputOutline } from '../common/input-outline';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLoading, setRefresh } from 'src/slices/common';
import { el } from 'date-fns/locale';

const CreateCustomerContractDialog = ({ open, onClose, onUpdate, customer, contract }) => {
  const [cleared, setCleared] = useState(false);
  const [selectedSignDate, setSelectedSignDate] = useState(null);
  const [selectedEffectiveDate, setSelectedEffectiveDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
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
    resolver: zodResolver(contractSchema),
    defaultValues: {
      number: '',
      name: '',
      customerId: '',
      signedDate: '',
      effectiveDate: '',
      endDate: '',
      beforeTax: 0,
      taxRate: 0,
    },
  });

  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true));
      const dataRequest={
        number: data.number,
        name: data.name,
        customerId: data.customerId,
        signedDate: data.signedDate,
        effectiveDate: data.effectiveDate,
        endDate: data.endDate,
        beforeTax: data.beforeTax,
        taxRate: Number(data.taxRate) / 100,
      } 
      let res = null 
      if(contract){
       res = await customersApi.updateCustomerContract({...dataRequest,contractId:contract.id});
      }
      else{
       res = await customersApi.createCustomerContract(dataRequest);
      }
      if (res.metadata.message === 'OK') {
        toast.success(t('Tạo hợp đồng thành công'));
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
    if (contract) {
      setSelectedSignDate(parseISO(contract.signedDate));
      setSelectedEffectiveDate(parseISO(contract.effectiveDate));
      setSelectedEndDate(parseISO(contract.endDate));

      setValue('number', contract.number);
      setValue('name', contract.name);
      setValue('signedDate', format(new Date(contract?.signedDate), 'yyyy-MM-dd'));
      setValue('effectiveDate', format(new Date(contract?.effectiveDate), 'yyyy-MM-dd'));
      setValue('endDate', format(new Date(contract?.endDate), 'yyyy-MM-dd'));
      setValue('beforeTax', contract.beforeTax);
      setValue('taxRate', Number(contract.taxRate) * 100);
    }
  }, [contract, open]);

  return (
    <DialogCustom
      open={open}
      onClose={onClose}
      title={contract ? t('Cập nhật hợp đồng') : t('Tạo hợp hợp đồng')}
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
              {contract ? t('Cập nhật') : t('Tạo mới')}
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
                md={6}
              >
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputOutline
                        {...field}
                        label={t('Tên hợp đồng')}
                        error={!!errors.name}
                      />
                      {errors.name && <Typography color="error">{errors.name.message}</Typography>}
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
                  name="number"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputOutline
                        {...field}
                        label={'Mã hợp đồng'}
                        error={!!errors.number}
                      />
                      {errors.number && (
                        <Typography color="error">{errors.number.message}</Typography>
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
                <FormControl
                  fullWidth
                  variant="outlined"
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="label"
                    htmlFor="select-date-input"
                    fontWeight={500}
                  >
                    {t('Ngày ký')}
                  </Typography>
                  <Controller
                    name="signedDate"
                    control={control}
                    render={({ field }) => (
                      <>
                        <DatePicker
                          format="dd-MM-yyyy"
                          value={selectedSignDate}
                          slotProps={{
                            field: {
                              id: 'select-date-input',
                              clearable: true,
                              onClear: () => {
                                setSelectedSignDate(null);
                                setValue('signedDate', '');
                              },
                            },
                          }}
                          onChange={(date) => {
                            setSelectedSignDate(date);
                            setValue('signedDate', format(date, 'yyyy-MM-dd'));
                          }}
                          sx={{
                            width: '100%',
                            '& .MuiIconButton-edgeEnd': {},
                          }}
                          label=""
                          error={!!errors.signedDate}
                        />
                        {errors.signedDate && (
                          <Typography color="error">{errors.signedDate.message}</Typography>
                        )}
                      </>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
              >
                <FormControl
                  fullWidth
                  variant="outlined"
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="label"
                    htmlFor="select-date-input"
                    fontWeight={500}
                  >
                    {t('Ngày hiệu lực')}
                  </Typography>
                  <Controller
                    name="effectiveDate"
                    control={control}
                    render={({ field }) => (
                      <>
                        <DatePicker
                          format="dd-MM-yyyy"
                          value={selectedEffectiveDate}
                          slotProps={{
                            field: {
                              id: 'select-date-input',
                              clearable: true,
                              onClear: () => {
                                setSelectedEffectiveDate(null);
                                setValue('effectiveDate', '');
                              },
                            },
                          }}
                          onChange={(date) => {
                            setSelectedEffectiveDate(date);
                            setValue('effectiveDate', format(date, 'yyyy-MM-dd'));
                          }}
                          sx={{
                            width: '100%',
                            '& .MuiIconButton-edgeEnd': {},
                          }}
                          label=""
                        />
                      </>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
              >
                <FormControl
                  fullWidth
                  variant="outlined"
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="label"
                    htmlFor="select-date-input"
                    fontWeight={500}
                  >
                    {t('Hạn hợp đồng')}
                  </Typography>
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => (
                      <>
                        <DatePicker
                          format="dd-MM-yyyy"
                          value={selectedEndDate}
                          slotProps={{
                            field: {
                              id: 'select-date-input',
                              clearable: true,
                              onClear: () => {
                                setSelectedEndDate(null);
                                setValue('endDate', '');
                              },
                            },
                          }}
                          onChange={(date) => {
                            setSelectedEndDate(date);
                            setValue('endDate', format(date, 'yyyy-MM-dd'));
                          }}
                          sx={{
                            width: '100%',
                            '& .MuiIconButton-edgeEnd': {},
                          }}
                          label=""
                        />
                        {errors.endDate && (
                          <Typography color="error">{errors.endDate.message}</Typography>
                        )}
                      </>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
              >
                <Controller
                  name="beforeTax"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputOutline
                        {...field}
                        type="number"
                        min={0}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        label={t('Số tiền trước thuế (VNĐ)')}
                        error={!!errors.beforeTax}
                      />
                      {errors.beforeTax && (
                        <Typography color="error">{errors.beforeTax.message}</Typography>
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
                  name="taxRate"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputOutline
                        {...field}
                        type="number"
                        min={0}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        label={t('Thuế (%)')}
                        error={!!errors.taxRate}
                      />
                      {errors.taxRate && (
                        <Typography color="error">{errors.taxRate.message}</Typography>
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

CreateCustomerContractDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

export default CreateCustomerContractDialog;
