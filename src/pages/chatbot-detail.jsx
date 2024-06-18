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
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { botsApi } from 'src/api/bots';
import { fetchUserFiles } from 'src/api/files';
import BotInfo from 'src/components/chatbot-detail/bot-info';
import EmbeddingHistory from 'src/components/chatbot-detail/embedding-history';
import EmbeddingSection from 'src/components/chatbot-detail/embedding-section';
import UserAccessTable from 'src/components/chatbot-detail/user-access-table';
import { useRefMounted } from 'src/hooks/use-ref-mounted';

const ChatbotDetail = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMountedRef = useRefMounted();
  const { id } = useParams();
  const [botData, setBotData] = useState({});
  const [tableData, setTableData] = useState([]);
  const currentAdmin = useSelector((state) => state.auth.admin);
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

  const loadUserFilesData = async () => {
    try {
      const data = await fetchUserFiles({
        botId: id,
        userId: currentAdmin.id,
      });
      setTableData(data);
    } catch (error) {
      console.error('Error fetching user files:', error);
    }
  };

  useEffect(() => {
    loadUserFilesData();
  }, [id]);

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
              <EmbeddingSection onEmbed={() => loadUserFilesData()} />
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
              <EmbeddingHistory tableData={tableData} />
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
              <UserAccessTable botId={id} />
            </Stack>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default ChatbotDetail;
