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
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { botsApi } from 'src/api/bots';
import { Helmet } from 'src/components/base/helmet';
import PageHeading from 'src/components/base/page-heading';
import PlaceholderBox from 'src/components/base/placeholder-box';
import { AvatarState } from 'src/components/base/styles/avatar';
import BotInfo from 'src/components/chatbot-detail/bot-info';
import EmbeddingHistory from 'src/components/chatbot-detail/embedding-history';
import EmbeddingSection from 'src/components/chatbot-detail/embedding-section';
import { useCustomization } from 'src/hooks/use-customization';
import { useRefMounted } from 'src/hooks/use-ref-mounted';
import Results from '../components/chatbot/chatbot-section';

const ChatbotDetail = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMountedRef = useRefMounted();
  const customization = useCustomization();
  const { id } = useParams();
  const [botData, setBotData] = useState({});
  const getBots = useCallback(async () => {
    try {
      const response = await botsApi.getBot({ botId: id });
      if (isMountedRef()) {
        setBotData(response);
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
          <Box>
            <Stack
              spacing={{
                xs: 2,
                sm: 3,
              }}
              direction={{
                xs: 'column',
                sm: 'row',
              }}
            >
              <BotInfo data={botData} />
              <EmbeddingHistory />
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
                sm: 3,
              }}
              direction={{
                xs: 'column',
                sm: 'row',
              }}
            >
              <EmbeddingSection />
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default ChatbotDetail;
