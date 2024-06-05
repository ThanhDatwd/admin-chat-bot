import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import LeaderboardTwoToneIcon from '@mui/icons-material/LeaderboardTwoTone';
import { Box, Button, Container, useTheme } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { botsApi } from 'src/api/bots';
import PageHeading from 'src/components/base/page-heading';
import { AvatarState } from 'src/components/base/styles/avatar';
import CreateChatbotDialog from 'src/components/chatbot/create-chatbot-dialog';
import RankingTable from 'src/components/ranking/ranking-table';
import { useCustomization } from 'src/hooks/use-customization';
import { useRefMounted } from 'src/hooks/use-ref-mounted';

const rankings = [
  {
    id: 1,
    name: 'Rank A',
    startingPoints: 100,
    status: 'Active',
    creationDate: '2024-06-05',
  },
  {
    id: 2,
    name: 'Rank B',
    startingPoints: 200,
    status: 'Inactive',
    creationDate: '2024-06-04',
  },
  {
    id: 3,
    name: 'Rank C',
    startingPoints: 300,
    status: 'Active',
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
              title={t('Xếp hạng')}
              description={t('Quản lý xếp hạng')}
              actions={
                <div>
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
                    {t('Thêm rank')}
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
                  <LeaderboardTwoToneIcon />
                </AvatarState>
              }
            />
          </Box>
          <RankingTable rankings={rankings} />
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

export default Ranking;
