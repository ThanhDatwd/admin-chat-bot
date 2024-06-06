import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CorporateFareTwoToneIcon from '@mui/icons-material/CorporateFareTwoTone';
import { Box, Button, Container, useTheme } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { customersApi } from 'src/api/customer';
import PageHeading from 'src/components/base/page-heading';
import { AvatarState } from 'src/components/base/styles/avatar';
import CreateCustomerByAdminDialog from 'src/components/customer/create-customer-dialog-by-admin';
import CustomerSection from 'src/components/customer/customer-section';
import { useCustomization } from 'src/hooks/use-customization';
import { useRefMounted } from 'src/hooks/use-ref-mounted';
import { setLoading } from 'src/slices/common';

const CustomerPage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMountedRef = useRefMounted();
  const customization = useCustomization();
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.loading);
  const isRefresh = useSelector((state) => state.common.refresh);

  // HANDLE OPEN CREATE USER DIALOG
  const handleDialogOpen = () => {
    setOpen(true);
  };

  // HANDLE CLOSE CREATE USER DIALOG
  const handleDialogClose = () => {
    setOpen(false);
  };
  const geCustomers = useCallback(
    async (paginate, filter) => {
      try {
        dispatch(setLoading(true));
        const response = await customersApi.getCustomers({
          pageNumber: paginate.pageNumber,
          pageSize: paginate.pageSize,
        });
        if (isMountedRef()) {
          setCustomers(response);
        }
      } catch (err) {
        console.error(err);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [isMountedRef, isRefresh]
  );

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
          <Box
            pb={{
              xs: 2,
              sm: 3,
            }}
          >
            <CustomerSection
              fetchData={geCustomers}
              totalCount={15}
              users={customers}
            />
          </Box>
        </Container>
      </Box>
      <CreateCustomerByAdminDialog
        open={open}
        onClose={handleDialogClose}
        onUpdate={(data) => setCustomers((prevCustomer) => [...prevCustomer, data])}
      />
    </>
  );
};
export default CustomerPage;
