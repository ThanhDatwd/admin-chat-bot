import RuleIcon from '@mui/icons-material/Rule';
import { Box, Container, FormControl, MenuItem, Select, Typography, useTheme } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { botsApi } from 'src/api/bots';
import { usersApi } from 'src/api/user';
import PageHeading from 'src/components/base/page-heading';
import { AvatarState } from 'src/components/base/styles/avatar';
import AutocompleteCustom from 'src/components/common/auto-complete-custom';
import DecentralizationTable from 'src/components/decentralization/decentralization-table';
import { useRefMounted } from 'src/hooks/use-ref-mounted';

const DecentralizationPage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMountedRef = useRefMounted();
  const [users, setUsers] = useState([]);
  const [bots, setBots] = useState([]);
  const [currentBotId, setCurrentBotId] = useState();

  const currentAdmin = useSelector((state) => state.auth.admin);
  const isLoading = useSelector((state) => state.common.loading);
  const isRefresh = useSelector((state) => state.common.refresh);
  const [totalCount, setTotalCount] = useState(0);

  const getUserByOrg = useCallback(
    async (paginate, filter) => {
      if (currentBotId) {
        try {
          const response = await usersApi.getUserByOrgWithGranted({
            customerId: currentAdmin.customerId,
            botId: currentBotId,
            pagination: {
              pageNumber: paginate.pageNumber,
              pageSize: paginate.pageSize,
            },
            filter,
          });
          if (isMountedRef()) {
            setUsers(response.content);
            setTotalCount(response.totalElements);
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        setUsers([]);
      }
    },
    [isMountedRef, isRefresh, currentBotId]
  );
  const getBots = useCallback(async () => {
    try {
      const response = await botsApi.getBotsByCustomer({
        customerId: currentAdmin.customerId,
        pagination: { pageNumber: 0, pageSize: 20 },
      });
      if (isMountedRef()) {
        setBots(response.content);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getBots();
  }, []);

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
              title={t('Gán quyền')}
              description={t('Gán quyền người dùng vào bot')}
              actions={
                <Box
                  sx={{
                    width: '300px',
                    maxWidth: '100%',
                  }}
                >
                  <FormControl
                    size="small"
                    variant="outlined"
                    fullWidth
                  >
                    <AutocompleteCustom
                      placeholder="Chọn bot để thực hiện"
                      options={bots.map((bot) => {
                        return { ...bot, label: bot.botName, value: bot.botId };
                      })}
                      value={currentBotId}
                      onChange={(item) => {
                        console.log(item.value);
                        setCurrentBotId(item.value);
                      }}
                    />
                  </FormControl>
                </Box>
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
                  <RuleIcon />
                </AvatarState>
              }
            />
          </Box>
          <DecentralizationTable
            totalCount={totalCount}
            users={users}
            botId={currentBotId}
            fetchData={getUserByOrg}
          />
        </Container>
      </Box>
    </>
  );
};
export default DecentralizationPage;
