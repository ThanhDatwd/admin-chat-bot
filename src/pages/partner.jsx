import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import HandshakeTwoToneIcon from '@mui/icons-material/HandshakeTwoTone';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import { Box, Button, Container, useTheme } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { botsApi } from 'src/api/bots';
import PageHeading from 'src/components/base/page-heading';
import { AvatarState } from 'src/components/base/styles/avatar';
import CreateChatbotDialog from 'src/components/chatbot/create-chatbot-dialog';
import PartnerTable from 'src/components/partner/partner-table';
import { useCustomization } from 'src/hooks/use-customization';
import { useRefMounted } from 'src/hooks/use-ref-mounted';

const partners = [
  {
    id: 1,
    name: 'Đối tác A',
    email: 'partnerA@example.com',
    phoneNumber: '0123456789',
    contractNumber: 'CON-001',
    field: 'Lĩnh vực A',
    botCount: 3,
    accountStatus: 'init',
    creationDate: '2024-06-01',
  },
  {
    id: 2,
    name: 'Đối tác B',
    email: 'partnerB@example.com',
    phoneNumber: '0123456789',
    contractNumber: 'CON-002',
    field: 'Lĩnh vực B',
    botCount: 5,
    accountStatus: 'pending',
    creationDate: '2024-05-20',
  },
  {
    id: 3,
    name: 'Đối tác C',
    email: 'partnerC@example.com',
    phoneNumber: '0123456789',
    contractNumber: 'CON-003',
    field: 'Lĩnh vực C',
    botCount: 2,
    accountStatus: 'approved',
    creationDate: '2024-06-03',
  },
  {
    id: 4,
    name: 'Đối tác D',
    email: 'partnerD@example.com',
    phoneNumber: '0123456789',
    contractNumber: 'CON-004',
    field: 'Lĩnh vực D',
    botCount: 7,
    accountStatus: 'embedded',
    creationDate: '2024-06-03',
  },
  {
    id: 5,
    name: 'Đối tác E',
    email: 'partnerE@example.com',
    phoneNumber: '0123456789',
    contractNumber: 'CON-005',
    field: 'Lĩnh vực E',
    botCount: 1,
    accountStatus: 'locked',
    creationDate: '2024-06-03',
  },
];

const Ranking = () => {
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
              title={t('Đối tác')}
              description={t('Quản lý đối tác')}
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
                  <HandshakeTwoToneIcon />
                </AvatarState>
              }
            />
          </Box>
          <PartnerTable partners={partners} />
        </Container>
      </Box>
    </>
  );
};

export default Ranking;
