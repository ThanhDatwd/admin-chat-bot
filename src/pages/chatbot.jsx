import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon';
import CogIcon from '@heroicons/react/24/outline/CogIcon';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
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
import { Helmet } from 'src/components/base/helmet';
import PageHeading from 'src/components/base/page-heading';
import { AvatarState } from 'src/components/base/styles/avatar';
import { CreateChatbotDialog } from 'src/components/chatbot/create-chatbot-dialog';
import { useCustomization } from 'src/hooks/use-customization';
import { useRefMounted } from 'src/hooks/use-ref-mounted';
import ChatbotSection from '../components/chatbot/chatbot-section';

const Chatbot = () => {
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
              title={t('Chatbot')}
              description={t('Quản lý chatbot')}
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
                    {t('Tạo bot')}
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
                  <SmartToyOutlinedIcon />
                </AvatarState>
              }
            />
          </Box>
          <ChatbotSection bots={bots} />
        </Container>
      </Box>
      <CreateChatbotDialog
        open={open}
        onClose={handleDialogClose}
      />
    </>
  );
};
export default Chatbot;
