import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from 'src/api/axios';
import {
  OPTION_CUSTOMER,
  OPTION_DISTRICT,
  OPTION_ORGANIZATION,
  OPTION_PROVINCE,
  OPTION_VILLAGE,
} from 'src/constans/user';
import userSchema from 'src/schemas/user-schema';
import AutocompleteCustom from '../common/auto-complete-custom';
import { DialogCustom } from '../common/dialog-custom';
import { InputOutline } from '../common/input-outline';
import { SelectCustom } from '../common/select-custom';
import TableGroupUser from './table-group-customer';
import UploadAvatarUser from './upload-avatar-customer';
import RegisterForm from '../register/register-form';
import CreateUserByOrgForm from './create-user-form-by-org';
import UserUploadList from './user-upload-list';
import { customersApi } from 'src/api/customer';
import { useTranslation } from 'react-i18next';
import { usersApi } from 'src/api/user';

const CreateUserByOrganizationDialog = ({ open, onClose, onUpdate }) => {
  const { t } = useTranslation();
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [listProvince, setListProvince] = useState(OPTION_PROVINCE);
  const [listDistrict, setListDistrict] = useState([]);
  const [listVillage, setListVillage] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [selectedGroupUser, setSelectedGroupUser] = useState([]);
  const [files, setFiles] = useState([]);
  const [userDataUpload, setUserDataUpload] = useState([]);
  const [uploadFiles, setUploadFiles] = useState([]);


  const theme = useTheme();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      userType: OPTION_CUSTOMER[1].value,
      email: '',
      organization: '',
      username: '',
      password: '',
      fullName: '',
      phoneNumber: '',
      houseNumber: '',
      address: '',
      province: 0,
      district: 0,
      village: 0,
      role:''
    },
  });


  const organization = useWatch({ control, name: 'organization' });
  const typeUser =  useWatch({ control, name: 'userType' });
  const province = useWatch({ control, name: 'province' });
  const district = useWatch({ control, name: 'district' });
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const res = await api.post(import.meta.env.VITE_API_URL_8086 + 'customer', {
        customerName: data.fullName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        email: data.email,
        website: data.website,
        provinceId: data.province,
        districtId: data.district,
        villageId: data.village,
        custHouseNumber: data.houseNumber,
        taxCode: 'TAX123456',
        representative: 'Jane Smith',
      });
      console.log('resposnce', res);
      if (res.metadata.message === 'OK') {
        toast.success('Tạo mới người dùng thành công');
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


  const handleCreateUser = async () => {
    try {
      if(userDataUpload.length>0){
        const customerId="967aac21-c16c-4c20-9208-f27a0f19fc05"
        const dataRequest={
          customerId,
          users:userDataUpload
        }
        const response = await usersApi.createUserByOrg(dataRequest)
      }
      else{
        toast.error(t('Please upload user and try again!'))
      }
      
    } catch (error) {
      toast.error(error?.response?.data?.error?.message ?? t('Something wrong please try again!'));
      console.log(error);
    }
  }
  return (
    <>
      <DialogCustom
        open={open}
        onClose={onClose}
        title={'Tạo người dùng mới '}
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
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleCreateUser}
              >
                Save
              </Button>
            </Stack>
          </>
        }
      >
       {/* <CreateUserByOrgForm/> */}
       <UserUploadList files={files}
          setFiles={setFiles}
          setUploadFiles={setUploadFiles}
          data={userDataUpload}
          setData={setUserDataUpload}

          />
      </DialogCustom>
    </>
  );
};

CreateUserByOrganizationDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

export default CreateUserByOrganizationDialog;
