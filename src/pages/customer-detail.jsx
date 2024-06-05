import { Box, Container, Grid, Stack, useTheme } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { customersApi } from 'src/api/customer';
import CustomerConfigSection from 'src/components/customer-detail/customer-config-section';
import CustomerContractSection from 'src/components/customer-detail/customer-contract-section';
import CustomerInfo from 'src/components/customer-detail/customer-info';
import { useCustomization } from 'src/hooks/use-customization';
import { useRefMounted } from 'src/hooks/use-ref-mounted';

const CustomerDetail = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMountedRef = useRefMounted();
  const customization = useCustomization();
  const { id } = useParams();
  const [customerData, setCustomerData] = useState({});
  const [contractData, setContractData] = useState();
  const [configData, setConfigData] = useState();
  const refresh = useSelector(state=>state.common.refresh)

  const getCustomer = useCallback(async () => {
    try {
      const response = await customersApi.getCustomer({ customerId: id });
      if (isMountedRef()) {
        setCustomerData(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);
  const getCustomerContract = useCallback(async () => {
    try {
      const response = await customersApi.getCustomerContract(id,{ pageNumber: 0, pageSize: 20 });
      if (isMountedRef()) {
        setContractData(response.data[response.data.length-1]??null);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);
  const getCustomerConfig = useCallback(async () => {
    try {
      const response = await customersApi.getCustomerConfig(
        id,{ pageNumber: 0, pageSize: 20 }
      );
      if (isMountedRef()) {
        setConfigData(response.data[response.data.length-1]??null);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getCustomer();
    getCustomerContract();
    getCustomerConfig()
  }, [getCustomer,refresh]);

  return (
    <>
      <Box
        mb={3}
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
          <Box>
            <Stack
              direction={{
                xs: 'column',
                sm: 'row',
              }}
            >
              <Grid
                container
                spacing={{ xs: 2, md: 2 }}
              >
                <Grid
                  item
                  xs={12}
                  md={8}
                >
                  <CustomerInfo customer={customerData} />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                >
                  <CustomerConfigSection customer={customerData}
                   config={configData} />
                </Grid>
              </Grid>
            </Stack>
          </Box>
          <Box
            pt={{
              xs: 2,
              sm: 3,
            }}
          >
            <Stack
              spacing={{
                xs: 2,
                sm: 2,
              }}
              direction={{
                xs: 'column',
                sm: 'row',
              }}
            >
              <CustomerContractSection
                customer={customerData}
                contract={contractData}
              />
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default CustomerDetail;
