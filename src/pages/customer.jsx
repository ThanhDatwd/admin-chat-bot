import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CorporateFareTwoToneIcon from '@mui/icons-material/CorporateFareTwoTone';
import { Box, Button, Container, useTheme } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { customersApi } from 'src/api/customer';
import PageHeading from 'src/components/base/page-heading';
import { AvatarState } from 'src/components/base/styles/avatar';
import CreateCustomerByAdminDialog from 'src/components/customer/create-customer-dialog-by-admin';
import CustomerSection from 'src/components/customer/customer-section';
import { useCustomization } from 'src/hooks/use-customization';
import { useRefMounted } from 'src/hooks/use-ref-mounted';

const CustomerPage = () => {
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
      const response = await customersApi.getCustomers({ pageNumber: 0, pageSize: 20 });
      if (isMountedRef()) {
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
              title={t('Khách hàng tổ chức')}
              description={t('Quản lý tổ chức')}
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
                    {t('Tạo tổ chức')}
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
                  <CorporateFareTwoToneIcon />
                </AvatarState>
              }
            />
          </Box>
          <CustomerSection
            users={customers}
            setIsRefresh={setIsRefresh}
          />
        </Container>
      </Box>
      {/* <CreateUserByOrganizationDialog 
         open={open}
        onClose={handleDialogClose}
        
      /> */}
      <CreateCustomerByAdminDialog
        organizations={customers}
        open={open}
        onClose={handleDialogClose}
        onUpdate={(data) => setCustomers((prevCustomer) => [...prevCustomer, data])}
      />
    </>
  );
};
export default CustomerPage;
