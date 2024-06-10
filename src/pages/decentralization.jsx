import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RuleIcon from '@mui/icons-material/Rule';
import { Box, Button, Container, FormControl, MenuItem, Select, useTheme } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { botsApi } from 'src/api/bots';
import { usersApi } from 'src/api/user';
import PageHeading from 'src/components/base/page-heading';
import { AvatarState } from 'src/components/base/styles/avatar';
import DecentralizationTable from 'src/components/decentralization/decentralization-table';
import CreateFieldDialog from 'src/components/field/create-field-dialog';
import FieldTable from 'src/components/field/field-table';
import { useRefMounted } from 'src/hooks/use-ref-mounted';

const invoices = [
  {
    id: '1',
    fieldName: 'Bộ công an',
    fieldCode: 'CA',
    tags: ['C03', 'CO4', 'C08'],
    status: 'active',
  },
  {
    id: '2',
    fieldName: 'Bộ tài nguyên và môi trường',
    fieldCode: 'TNMT',
    tags: ['TNMT03', 'TNMTO4', 'TNMT08'],
    status: 'active',
  },
  { id: '3', fieldName: 'Bộ Ngoại giao', fieldCode: 'NG', tags: ['NG03', 'NG04', 'NG08'] },
  { id: '4', fieldName: 'Bộ Tài chính', fieldCode: 'TC', tags: ['TC04', 'TC05', 'TC09'] },
  {
    id: '5',
    fieldName: 'Bộ Giáo dục và Đào tạo',
    fieldCode: 'GD',
    tags: ['GD05', 'GD06', 'GD10'],
    status: 'active',
  },
  { id: '6', fieldName: 'Bộ Y tế', fieldCode: 'YT', tags: ['YT06', 'YT07', 'YT11'] },
  { id: '7', fieldName: 'Bộ Công thương', fieldCode: 'CT', tags: ['CT07', 'CT08', 'CT12'] },
  {
    id: '8',
    fieldName: 'Bộ Giao thông vận tải',
    fieldCode: 'GTVT',
    tags: ['GTVT08', 'GTVT09', 'GTVT13'],
    status: 'inactive',
  },
  { id: '9', fieldName: 'Bộ Tư pháp', fieldCode: 'TP', tags: ['TP09', 'TP10', 'TP14'] },
  {
    id: '10',
    fieldName: 'Bộ Nông nghiệp và Phát triển nông thôn',
    fieldCode: 'NNPTNT',
    tags: ['NNPTNT10', 'NNPTNT11', 'NNPTNT15'],
    status: 'active',
  },
  {
    id: '11',
    fieldName: 'Bộ Lao động - Thương binh và Xã hội',
    fieldCode: 'LDTBXH',
    tags: ['LDTBXH11', 'LDTBXH12', 'LDTBXH16'],
    status: 'inactive',
  },
  {
    id: '12',
    fieldName: 'Bộ Quốc phòng',
    fieldCode: 'QP',
    tags: ['QP12', 'QP13', 'QP17'],
    status: 'active',
  },
];

const DecentralizationPage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMountedRef = useRefMounted();
  const [users, setUsers] = useState([]);
  const [bots, setBots] = useState([]);
  const [currentBotId, setCurrentBotId] = useState();

  const [open, setOpen] = useState(false);
  const currentAdmin = useSelector((state) => state.auth.admin);
  const isLoading = useSelector((state) => state.common.loading);
  const isRefresh = useSelector((state) => state.common.refresh);
  const [totalCount, setTotalCount] = useState(0);

  const handleDialogOpen = () => {
    setOpen(true);
  };
  const handleDialogClose = () => {
    setOpen(false);
  };

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
          });
          if (isMountedRef()) {
            setUsers(response.content);
            setTotalCount(response.totalElements);
          }
        } catch (err) {
          console.error(err);
        }
      }
    },
    [isMountedRef, isRefresh, currentBotId]
  );
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
                <div>
                  <FormControl
                    size="small"
                    variant="outlined"
                  >
                    <Select
                      value={currentBotId}
                      onChange={(e) => {
                        console.log(e.target.value)
                        setCurrentBotId(e.target.value);
                      }}
                      label=""
                      placeholder="Chose your bot"
                      sx={{ width: '200px' }}
                    >
                      {bots.map((bot, index) => (
                        <MenuItem
                          key={index}
                          value={bot.botId}
                        >
                          {bot.botName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
