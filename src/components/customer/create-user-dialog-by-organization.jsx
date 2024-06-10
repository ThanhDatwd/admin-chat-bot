import { Box, Button, CircularProgress, Stack, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { usersApi } from 'src/api/user';
import { setLoading } from 'src/slices/common';
import { DialogCustom } from '../common/dialog-custom';
import UserUploadList from './user-upload-list';

const CreateUserByOrganizationDialog = ({ open, onClose, onUpdate }) => {
  const { t } = useTranslation();
  const [files, setFiles] = useState([]);
  const [userDataUpload, setUserDataUpload] = useState([]);
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.common.loading);
  const isRefresh = useSelector((state) => state.common.refresh);
  const currentAdmin = useSelector((state) => state.auth.admin);

  const theme = useTheme();

  const handleCreateUser = async () => {
    try {
      dispatch(setLoading(true));
      if (userDataUpload.length > 0) {
        const customerId =currentAdmin.customerId ;
        const dataRequest = {
          customerId,
          users: userDataUpload,
        };
        const response = await usersApi.createUserByOrg(dataRequest);

        toast.error(t('Tạo người dùng thành công'));
        setFiles([]);
        setUserDataUpload([]);
        onClose();
        onUpdate?.(response.data);
      } else {
        toast.error(t('Please upload user and try again!'));
      }
    } catch (error) {
      toast.error(error?.response?.data?.error?.message ?? t('Something wrong please try again!'));
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (!open) {
      setFiles([]);
    }
  }, [open]);
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
                type="submit"
                size="large"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                }}
                onClick={handleCreateUser}
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
        <UserUploadList
          files={files}
          setFiles={setFiles}
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
