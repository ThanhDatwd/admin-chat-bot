import {
  Box,
  Container,
  Stack,
  useTheme
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { botsApi } from 'src/api/bots';
import { fetchUserFiles } from 'src/api/files';
import BotInfo from 'src/components/chatbot-detail/bot-info';
import EmbeddingHistory from 'src/components/chatbot-detail/embedding-history';
import EmbeddingSection from 'src/components/chatbot-detail/embedding-section';
import UserAccessTable from 'src/components/chatbot-detail/user-access-table';
import { useRefMounted } from 'src/hooks/use-ref-mounted';
import { setLoading } from 'src/slices/common';

const ChatbotDetail = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMountedRef = useRefMounted();
  const { id } = useParams();
  const [botData, setBotData] = useState({});
  const [tableData, setTableData] = useState([]);
  const currentAdmin = useSelector((state) => state.auth.admin);
  const isLoading = useSelector((state) => state.common.loading);
  const isRefresh = useSelector((state) => state.common.refresh);

  const dispatch = useDispatch();
  const getBot = useCallback(async () => {
    try {
      const response = await botsApi.getBot({ botId: id });
      if (isMountedRef()) {
        setBotData(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [id, isMountedRef]);

  useEffect(() => {
    let intervalId = null
  //  if(botData.botStatus===BOT_STATUS.SYNCING.value){
    intervalId = setInterval(() => {
      getBot();
    }, 5000);
  //  }

    return () => clearInterval(intervalId);
  }, [botData,isRefresh]);

  const loadUserFilesData = async () => {
    try {
      const data = await fetchUserFiles({
        botId: id,
        customerId: currentAdmin.customerId,
      });
      setTableData(data);
    } catch (error) {
      console.error('Error fetching user files:', error);
    }
  };

  useEffect(() => {
    dispatch(setLoading(true));
    try {
      getBot();
      loadUserFilesData();
    } catch (error) {
      console.error('Error', error);
    } finally {
      dispatch(setLoading(false));
    }
  }, [id,isRefresh]);

  return (
    <>
      {/* {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            height: '50vh',
          }}
          color="common.white"
        >
          {' '}
          <CircularProgress style={{ height: '30px', width: '30px' }} />
        </Box>
      ) : ( */}
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
      {/* )} */}
    </>
  );
};
export default ChatbotDetail;
