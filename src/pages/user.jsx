import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
  useTheme,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { botsApi } from 'src/api/bots';
import { customersApi } from 'src/api/customer';
import { usersApi } from 'src/api/user';
import { Helmet } from 'src/components/base/helmet';
import PageHeading from 'src/components/base/page-heading';
import { AvatarState } from 'src/components/base/styles/avatar';
import CreateCustomerByAdminDialog from 'src/components/customer/create-customer-dialog-by-admin';
import CreateUserByOrganizationDialog from 'src/components/customer/create-user-dialog-by-organization';
import UserSection from 'src/components/user/user-section';
// import UserSection from 'src/components/user/user-section';
import { useCustomization } from 'src/hooks/use-customization';
import { useRefMounted } from 'src/hooks/use-ref-mounted';

const UserPage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMountedRef = useRefMounted();
  const customization = useCustomization();
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  // HANDLE OPEN CREATE USER DIALOG
  const handleDialogOpen = () => {
    setOpen(true);
  };

  // HANDLE CLOSE CREATE USER DIALOG
  const handleDialogClose = () => {
    setOpen(false);
  };

  const geCustomers = useCallback(async () => {
    try {
      const response = await usersApi.getUserByOrg({
        customerId: '967aac21-c16c-4c20-9208-f27a0f19fc05',
        pagination: { pageNumber: 0, pageSize: 20 },
      });
      if (isMountedRef()) {
        console.log('this is data user', response);
        setCustomers(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef, isRefresh]);

  useEffect(() => {
    geCustomers();
  }, [geCustomers]);

  return (
    <>
      <Box
        px={{
          xs: 2,
          sm: 3,
        }}
        pt={{
          xs: 2,
          sm: 3,
        }}
        component="main"
        flex={1}
        display="flex"
        flexDirection="column"
      >
        <Container
          disableGutters
          maxWidth="xl"
        >
          <Box
            pb={{
              xs: 2,
              sm: 3,
            }}
          >
            <PageHeading
              sx={{
                px: 0,
              }}
              title={t('Danh sách người dùng')}
              description={t('Quản lý người dùng')}
              actions={
                <>
                  <Button
                    sx={{
                      mt: {
                        xs: 2,
                        md: 0,
                      },
                    }}
                    variant="contained"
                    onClick={handleDialogOpen}
                    startIcon={<AddOutlinedIcon fontSize="small" />}
                  >
                    {t('Tạo người dùng')}
                  </Button>
                </>
              }
              iconBox={
                <AvatarState
                  isSoft
                  variant="rounded"
                  state="primary"
                  sx={{
                    height: theme.spacing(7),
                    width: theme.spacing(7),
                    svg: {
                      height: theme.spacing(4),
                      width: theme.spacing(4),
                      minWidth: theme.spacing(4),
                    },
                  }}
                >
                  <PersonOutlineOutlinedIcon />
                </AvatarState>
              }
            />
          </Box>
          <UserSection
            users={customers}
            setIsRefresh={setIsRefresh}
          />
        </Container>
      </Box>
      <CreateUserByOrganizationDialog
        open={open}
        onClose={handleDialogClose}
        onUpdate={(data) => setCustomers((prevCustomer) => [...prevCustomer, data])}
      />
    </>
  );
};
export default UserPage;
