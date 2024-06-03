import { zodResolver } from '@hookform/resolvers/zod';
import { Box, FormControl, Grid, Stack, Typography, useTheme } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { t } from 'i18next';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { customersApi } from 'src/api/customer';
import {
  OPTION_PROVINCE
} from 'src/constans/user';
import customerSchema from 'src/schemas/customer-schema';
import { InputOutline } from '../common/input-outline';
import { SelectCustom } from '../common/select-custom';

const CreateCustomerContractForm = ({ open, onClose, onUpdate, organizations }) => {
  const [isloading, setIsLoading] = useState(false);
  const [cleared, setCleared] = useState(false);

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
      houseNumber: '',
      address: '',
      province: 0,
      district: 0,
      village: 0,
      taxCode: '',
      representative: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const res = await customersApi.createCustomer({
        customerName: data.customerName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        email: data.email,
        website: data.website,
        provinceId: data.province,
        districtId: data.district,
        villageId: data.village,
        custHouseNumber: data.houseNumber,
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
      <Stack spacing={{ xs: 2, sm: 3 }}>
        <Box>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
          >
            <Grid
              item
              xs={12}
            >
              <Controller
                name="customerName"
                control={control}
                render={({ field }) => (
                  <>
                    <InputOutline
                      {...field}
                      label={'Mã hợp đồng'}
                      error={!!errors.customerName}
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
                <DatePicker
                format='dd/MM/yyyy'
                  slotProps={{
                    field: {
                      id: 'select-date-input',
                      clearable: true,
                      onClear: () => setCleared(true),
                    },
                  }}
                  sx={{
                    width:'100%',
                    '& .MuiIconButton-edgeEnd': {
                     
                    },
                  }}
                  label=""
                />
              </FormControl>
            </Grid>
            <Grid
            item
              xs={12}
              md={6}
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
                <DatePicker
                format='dd/MM/yyyy'
                  slotProps={{
                    field: {
                      id: 'select-date-input',
                      clearable: true,
                      onClear: () => setCleared(true),
                    },
                  }}
                  sx={{
                    '& .MuiIconButton-edgeEnd': {
                     
                    },
                  }}
                  label=""
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
            >
              <Controller
                name="province"
                control={control}
                render={({ field }) => (
                  <>
                    <SelectCustom
                      label={'Trạng thái'}
                      options={OPTION_PROVINCE}
                      value={field.value}
                      onChange={field.onChange}
                      error={!!errors.province}
                      errorMessage={errors.province ? errors.province.message : ''}
                    />
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
                name="phonember"
                control={control}
                render={({ field }) => (
                  <>
                    <InputOutline
                      {...field}
                      label={'Số tiền trước thuế'}
                      error={!!errors.phoneNumber}
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
              md={4}
            >
              <Controller
                name="phonember"
                control={control}
                render={({ field }) => (
                  <>
                    <InputOutline
                      {...field}
                      label={'Thuế'}
                      error={!!errors.phoneNumber}
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
              md={4}
            >
              <Controller
                name="phonember"
                control={control}
                render={({ field }) => (
                  <>
                    <InputOutline
                      {...field}
                      label={'Số tiền sau thuế'}
                      error={!!errors.phoneNumber}
                    />
                    {errors.phoneNumber && (
                      <Typography color="error">{errors.phoneNumber.message}</Typography>
                    )}
                  </>
                )}
              />
            </Grid>

            
          </Grid>
        </Box>
      </Stack>
    </>
  );
};

CreateCustomerContractForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

export default CreateCustomerContractForm;
