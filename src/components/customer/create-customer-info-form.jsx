import { zodResolver } from '@hookform/resolvers/zod';
import {
    Box,
    Grid,
    Stack,
    Typography,
    useTheme
} from '@mui/material';
import { t } from 'i18next';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { customersApi } from 'src/api/customer';
import {
    OPTION_DISTRICT,
    OPTION_ORGANIZATION,
    OPTION_PROVINCE,
    OPTION_VILLAGE
} from 'src/constants/user';
import { InputOutline } from '../common/input-outline';
import { SelectCustom } from '../common/select-custom';
import customerSchema from 'src/schemas/customer-schema';

const CreateCustomerInfoForm = ({ open, onClose, onUpdate , organizations}) => {
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [listProvince, setListProvince] = useState(OPTION_PROVINCE);
  const [listDistrict, setListDistrict] = useState([]);
  const [listVillage, setListVillage] = useState([]);
  const [isloading, setIsLoading] = useState(false);

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
      taxCode:'',
      representative:''
    },
  });


  const organization = useWatch({ control, name: 'organization' });
  const typeUser =  useWatch({ control, name: 'userType' });
  const province = useWatch({ control, name: 'province' });
  const district = useWatch({ control, name: 'district' });
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

  useEffect(() => {
    setSelectedOrganization(OPTION_ORGANIZATION.find((org) => org.value === organization));
  }, [organization]);
  useEffect(() => {
    setListDistrict(OPTION_DISTRICT[province]);
  }, [province]);
  useEffect(() => {
    setListVillage(OPTION_VILLAGE[district]);
  }, [district]);


  return (
    <>
    info
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
                      />
                      {errors.website && (
                        <Typography color="error">{errors.website.message}</Typography>
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
                  name="houseNumber"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputOutline
                        {...field}
                        label={'Số nhà'}
                        error={!!errors.houseNumber}
                      />
                      {errors.houseNumber && (
                        <Typography color="error">{errors.houseNumber.message}</Typography>
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
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputOutline
                        {...field}
                        label={'Địa chỉ'}
                        error={!!errors.address}
                      />
                      {errors.address && (
                        <Typography color="error">{errors.address.message}</Typography>
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
                  name="province"
                  control={control}
                  render={({ field }) => (
                    <>
                      <SelectCustom
                        label={'Tỉnh / Thành phố'}
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
                  name="district"
                  control={control}
                  render={({ field }) => (
                    <>
                      <SelectCustom
                        label={'Quận / Huyện'}
                        options={listDistrict}
                        value={field.value}
                        onChange={field.onChange}
                        error={!!errors.district}
                        errorMessage={errors.district ? errors.district.message : ''}
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
                  name="village"
                  control={control}
                  render={({ field }) => (
                    <>
                      <SelectCustom
                        label={'Xã / Phường'}
                        options={listVillage}
                        value={field.value}
                        onChange={field.onChange}
                        error={!!errors.village}
                        errorMessage={errors.village ? errors.village.message : ''}
                      />
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

CreateCustomerInfoForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

export default CreateCustomerInfoForm;
