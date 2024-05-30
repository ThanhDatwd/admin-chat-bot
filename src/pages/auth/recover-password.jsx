import HelpTwoToneIcon from '@mui/icons-material/HelpTwoTone';
import {
  alpha,
  Box,
  Container,
  Grid,
  IconButton,
  Paper,
  styled,
  Tooltip,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Logo } from 'src/components/base/logo';
import RecoverPasswordForm from 'src/components/recover-password/recover-password-form';
import RegisterBg from '../../assets/images/all-img/register-bg.png';
import KatechLogo from '../../assets/images/logo/logo.png';

const CardActions = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(1),
  top: theme.spacing(1),
  zIndex: 12,
}));
const BoxComposedContent = styled(Box)(() => ({
  position: 'relative',
  zIndex: 7,
}));
const BoxComposedImage = styled(Box)(() => ({
  position: 'absolute',
  left: 0,
  top: 0,
  zIndex: 5,
  filter: 'grayscale(40%)',
  backgroundSize: 'cover',
  height: '100%',
  width: '100%',
  borderRadius: 'inherit',
}));
const IconButtonWrapper = styled(IconButton)(({ theme }) => ({
  background: 'transparent',
  transition: theme.transitions.create(['all']),
  color: alpha(theme.palette.common.white, 0.7),
  borderRadius: '50px',
  '&:hover': {
    background: 'transparent',
    color: theme.palette.common.white,
  },
}));
const RecoverPasswordPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={7}
        >
          <Box
            display="flex"
            alignItems="center"
            position="relative"
            sx={{
              width: '100%',
              position: 'relative',
              minHeight: '100%',
              background: 'linear-gradient(to right, #4b6cb7, #182848);',
            }}
          >
            <CardActions
              display="flex"
              alignItems="center"
            >
              <Tooltip
                arrow
                title={t('Get in touch with support')}
                placement="left"
              >
                <IconButtonWrapper
                  sx={{
                    ml: 0.5,
                  }}
                >
                  <HelpTwoToneIcon fontSize="small" />
                </IconButtonWrapper>
              </Tooltip>
            </CardActions>

            <BoxComposedImage
              sx={{
                opacity: 0.8,
                backgroundImage: (theme) =>
                  theme.palette.mode === 'dark'
                    ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/placeholders/covers/landscape4.png")`
                    : `url(${RegisterBg})`,
              }}
            />
            <BoxComposedContent
              display="flex"
              flexGrow={1}
              alignItems="center"
              flexDirection="column"
              px={{
                xs: 0,
                sm: 3,
                lg: 6,
                xl: 8,
              }}
              py={{
                xs: 2,
                sm: 3,
                lg: 6,
                xl: 8,
              }}
            >
              <Container
                sx={{
                  flexDirection: 'column',
                  display: {
                    xs: 'flex',
                    sm: 'flex',
                    md: 'flex',
                  },
                }}
                maxWidth="sm"
              >
                <Box
                  display="flex"
                  justifyContent={{
                    xs: 'center',
                    md: 'flex-start',
                  }}
                  alignItems={'center'}
                  gap={'20px'}
                >
                  <img
                    src={KatechLogo}
                    style={{ height: 128, width: 128 }}
                    alt=""
                  />

                  <Box
                    display={{
                      xs: 'none',
                      md: 'block',
                    }}
                    color="common.white"
                  >
                    <h1 style={{ fontSize: '5rem' }}>Katech</h1>
                  </Box>
                </Box>
              </Container>
            </BoxComposedContent>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: {
              xs: 'flex-start',
              sm: 'center',
            },
          }}
        >
          <Box
            py={{
              xs: 2,
              sm: 3,
            }}
            mx={{
              xl: 6,
            }}
          >
            <RecoverPasswordForm />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default RecoverPasswordPage;
