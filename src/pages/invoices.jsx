import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import { Box, Button, Container, useTheme } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { botsApi } from 'src/api/bots';
import PageHeading from 'src/components/base/page-heading';
import { AvatarState } from 'src/components/base/styles/avatar';
import CreateChatbotDialog from 'src/components/chatbot/create-chatbot-dialog';
import InvoicesTable from 'src/components/invoices/invoices-table';
import { useCustomization } from 'src/hooks/use-customization';
import { useRefMounted } from 'src/hooks/use-ref-mounted';

const invoices = [
  {
    id: '1',
    invoiceNumber: 'INV-001',
    customerName: 'Nguyen Van A',
    customerCode: 'CUST-001',
    contractNumber: 'CON-001',
    amount: '1500000',
    invoiceStatus: 'synced',
    paymentStatus: 'paid',
    creationDate: '2023-05-15',
  },
  {
    id: '2',
    invoiceNumber: 'INV-002',
    customerName: 'Tran Thi B',
    customerCode: 'CUST-002',
    contractNumber: 'CON-002',
    amount: '2000000',
    invoiceStatus: 'unsynced',
    paymentStatus: 'unpaid',
    creationDate: '2023-05-20',
  },
  {
    id: '3',
    invoiceNumber: 'INV-003',
    customerName: 'Le Van C',
    customerCode: 'CUST-003',
    contractNumber: 'CON-003',
    amount: '1000000',
    invoiceStatus: 'synced',
    paymentStatus: 'unpaid',
    creationDate: '2023-06-01',
  },
  {
    id: '4',
    invoiceNumber: 'INV-004',
    customerName: 'Pham Thi D',
    customerCode: 'CUST-004',
    contractNumber: 'CON-004',
    amount: '2500000',
    invoiceStatus: 'unsynced',
    paymentStatus: 'paid',
    creationDate: '2023-06-05',
  },
  {
    id: '5',
    invoiceNumber: 'INV-005',
    customerName: 'Do Van E',
    customerCode: 'CUST-005',
    contractNumber: 'CON-005',
    amount: '3000000',
    invoiceStatus: 'synced',
    paymentStatus: 'paid',
    creationDate: '2023-06-10',
  },
  {
    id: '6',
    invoiceNumber: 'INV-006',
    customerName: 'Hoang Thi F',
    customerCode: 'CUST-006',
    contractNumber: 'CON-006',
    amount: '1800000',
    invoiceStatus: 'unsynced',
    paymentStatus: 'unpaid',
    creationDate: '2023-06-12',
  },
];

const Invoices = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMountedRef = useRefMounted();
  const customization = useCustomization();
  const [bots, setBots] = useState([]);
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };
  const handleDialogClose = () => {
    setOpen(false);
  };

  const getBots = useCallback(async () => {
    try {
      const response = await botsApi.getBots({ pageNumber: 0, pageSize: 20 });
      if (isMountedRef()) {
        setBots(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getBots();
  }, [getBots]);

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
              title={t('Hóa đơn')}
              description={t('Quản lý hóa đơn')}
              actions={
                <div>
                  <Button
                    sx={{
                      mt: {
                        xs: 2,
                        md: 0,
                      },
                      mr: 2,
                    }}
                    variant="contained"
                    onClick={handleDialogOpen}
                    startIcon={<FileDownloadOutlinedIcon fontSize="small" />}
                  >
                    {t('Xuất file')}
                  </Button>
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
                    {t('Tạo hóa đơn')}
                  </Button>
                </div>
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
                  <ReceiptOutlinedIcon />
                </AvatarState>
              }
            />
          </Box>
          <InvoicesTable invoices={invoices} />
        </Container>
      </Box>
      <CreateChatbotDialog
        open={open}
        onClose={handleDialogClose}
        onUpdate={getBots}
      />
    </>
  );
};
export default Invoices;
