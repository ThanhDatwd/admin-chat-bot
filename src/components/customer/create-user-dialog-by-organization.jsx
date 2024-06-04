import { Button, Stack, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { usersApi } from 'src/api/user';
import { DialogCustom } from '../common/dialog-custom';
import UserUploadList from './user-upload-list';

const CreateUserByOrganizationDialog = ({ open, onClose, onUpdate }) => {
  const { t } = useTranslation();
  const [files, setFiles] = useState([]);
  const [userDataUpload, setUserDataUpload] = useState([]);
  const [uploadFiles, setUploadFiles] = useState([]);

  const theme = useTheme();

  const handleCreateUser = async () => {
    try {
      if (userDataUpload.length > 0) {
        const customerId = '967aac21-c16c-4c20-9208-f27a0f19fc05';
        const dataRequest = {
          customerId,
          users: userDataUpload,
        };
        const response = await usersApi.createUserByOrg(dataRequest);

        toast.error(t('Tạo người dùng thành công'));
        setFiles([]);
        setUserDataUpload([]);
        setUploadFiles([]);
        onClose();
        onUpdate?.(response.data);
      } else {
        toast.error(t('Please upload user and try again!'));
      }
    } catch (error) {
      toast.error(error?.response?.data?.error?.message ?? t('Something wrong please try again!'));
      console.log(error);
    }
  };
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
        <UserUploadList
          files={files}
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
