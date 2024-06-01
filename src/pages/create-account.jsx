import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import {
  Box,
  Container,
  useTheme
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { customersApi } from 'src/api/customer';
import PageHeading from 'src/components/base/page-heading';
import { AvatarState } from 'src/components/base/styles/avatar';
import CreateAdminAccountForm from 'src/components/customer/create-admin-account-form';
import { useRefMounted } from 'src/hooks/use-ref-mounted';

const CreateAccountAdminPage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMountedRef = useRefMounted();
  const [customers, setCustomers] = useState([]);


  
  const geCustomers = useCallback(async () => {
    try {
      const response = await customersApi.getCustomers({ pageNumber: 0, pageSize: 20 });
      if (isMountedRef()) {
        setCustomers(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

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
              title={t('Tạo tài khoản quản trị')}
             
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
          <CreateAdminAccountForm organizations={customers.map(customer=>{
            return {...customer,label:customer.customerName, value:customer.customerId}
          })}/>
        </Container>
      </Box>
      
    </>
  );
};
export default CreateAccountAdminPage;
