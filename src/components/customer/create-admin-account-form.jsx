import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import { t } from 'i18next';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import {
  OPTION_DISTRICT,
  OPTION_ORGANIZATION,
  OPTION_PROVINCE,
  OPTION_VILLAGE
} from 'src/constans/user';
import { userOrganizationSchema } from 'src/schemas/user-schema';
import AutocompleteCustom from '../common/auto-complete-custom';
import { InputOutline } from '../common/input-outline';
import { SelectCustom } from '../common/select-custom';

const CreateAdminAccountForm = ({ open, onClose, onUpdate , organizations=[]}) => {
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
    resolver: zodResolver(userOrganizationSchema),
    defaultValues: {
      organization:'',
      email: '',
      username: '',
      password: '',
      fullName: '',
      phoneNumber: '',
      houseNumber: '',
      address: '',
      province: 0,
      district: 0,
      village: 0,
      // role:'',
      // taxCode:'',
      // representative:''
    },
  });

  const organization = useWatch({ control, name: 'organization' });
  const typeUser =  useWatch({ control, name: 'userType' });
  const province = useWatch({ control, name: 'province' });
  const district = useWatch({ control, name: 'district' });
  const onSubmit = async (data) => {
    // try {
    //   setIsLoading(true);
    //   const res = await api.post(import.meta.env.VITE_API_URL_8086 + 'customer', {
    //     customerName: data.fullName,
    //     address: data.address,
    //     phoneNumber: data.phoneNumber,
    //     email: data.email,
    //     website: data.website,
    //     provinceId: data.province,
    //     districtId: data.district,
    //     villageId: data.village,
    //     custHouseNumber: data.houseNumber,
    //     taxCode: 'TAX123456',
    //     representative: 'Jane Smith',
    //   });
    //   console.log('resposnce', res);
    //   if (res.metadata.message === 'OK') {
    //     toast.success('Tạo mới người dùng thành công');
    //   }
    //   onUpdate?.(data);
    //   reset();
    //   onClose();
    // } catch (error) {
    //   console.error('Error creating bot:', error);
    // } finally {
    //   setIsLoading(false);
    // }
  };
  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open]);

  useEffect(() => {
    setSelectedOrganization(organizations.find((org) => org.value === organization));
  }, [organization]);
  useEffect(() => {
    setListDistrict(OPTION_DISTRICT[province]);
  }, [province]);
  useEffect(() => {
    setListVillage(OPTION_VILLAGE[district]);
  }, [district]);


  return (
    <>
     
        <Stack sx={{pb:5}}
         spacing={{ xs: 2, sm: 3 }}>
          <Box>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
            >
             
             <>
             <Grid
                item
                xs={12}
              >
                <Controller
                  name="organization"
                  control={control}
                  render={({ field }) => (
                    <>
                      <AutocompleteCustom
                        label={t('Tổ chức')}
                        placeholder="Chọn một tổ chức"
                        options={organizations}
                        value={field.value}
                        onChange={(item) => {field.onChange(item.value)
                        }}
                        error={!!errors.organization}
                      />
                      {errors.organization && (
                        <Typography color="error">{errors.organization.message}</Typography>
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
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputOutline
                        {...field}
                        label={'Tài khoản'}
                        placeholder={''}
                        error={!!errors.username}
                      />
                      {errors.username && (
                        <Typography color="error">{errors.username.message}</Typography>
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
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputOutline
                        {...field}
                        type={'password'}
                        error={!!errors.password}
                        label={'Mật khẩu'}
                      />
                      {errors.password && (
                        <Typography color="error">{errors.password.message}</Typography>
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
                  name="fullName"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputOutline
                        {...field}
                        label={'Họ và tên'}
                        error={!!errors.fullName}
                      />
                      {errors.fullName && (
                        <Typography color="error">{errors.fullName.message}</Typography>
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
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <>
                      <InputOutline
                        {...field}
                        error={!!errors.role}
                        label={'Vai trò / Vị trí'}
                      />
                      {errors.role && (
                        <Typography color="error">{errors.role.message}</Typography>
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
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </Button>
            </Stack>
          </>
              </Grid>
              {/* <Grid
                item
                xs={12}
              >
                <Controller
                  name="avatar"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <UploadAvatarUser onUpload={(files) => field.onChange(files)} />
                      {fieldState.error && (
                        <Typography color="error">{fieldState.error.message}</Typography>
                      )}
                    </>
                  )}
                />
              </Grid> */}
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
