import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
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
import { useCustomization } from 'src/hooks/use-customization';
import { useRefMounted } from 'src/hooks/use-ref-mounted';
import Results from '../components/chatbot/chatbot-section';

const User = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMountedRef = useRefMounted();
  const customization = useCustomization();
  const [users, setUsers] = useState([]);
  const getBots = useCallback(async () => {
    try {
      const response = await botsApi.getBots({ pageNumber: 0, pageSize: 20 });
      if (isMountedRef()) {
        setUsers(response);
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
              title={t('User')}
              description={t('Quản lý User')}
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
                    startIcon={<AddOutlinedIcon fontSize="small" />}
                  >
                    {t('Tạo user')}
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
                  <PersonOutlineOutlinedIcon />
                </AvatarState>
              }
            />
          </Box>
          <Results users={users} />
        </Container>
      </Box>
    </>
  );
};
export default User;
