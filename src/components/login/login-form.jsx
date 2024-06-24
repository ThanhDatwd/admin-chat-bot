import { zodResolver } from '@hookform/resolvers/zod';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Unstable_Grid2 as Grid,
  InputAdornment,
  Link,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import api from 'src/api/axios';
import { ButtonIcon } from 'src/components/base/styles/button-icon';
import { ROLE_ACCESS_ADMIN_PAGE } from 'src/constants/role';
import { setAmin } from 'src/slices/auth';
import { setLoading } from 'src/slices/common';
import { useSelector } from 'src/store';
import { z } from 'zod';
import DocumentsUploadList from '../chatbot-detail/documents-upload-list';
import DocumentsUploadListNoInput from '../chatbot-detail/documents-upload-list-noinput';

const schema = z.object({
  username: z.string().min(1, 'Invalid username '),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});
function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.common.loading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
    },
  });
  const [files, setFiles] = useState([]);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const { t } = useTranslation();
  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true));
      const requestData = {
        username: data.username,
        password: data.password,
      };

      const response = await api.post(
        import.meta.env.VITE_API_AUTH_URL_8080 + 'auth/login',
        requestData
      );

      const infoExtract = jwtDecode(response.data.accessToken);
      if (infoExtract?.roles.some((item) => ROLE_ACCESS_ADMIN_PAGE.includes(item.authority))) {
        dispatch(setAmin(response.data));

        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('expiration', response.data.expiration);
        toast.success(t('Login successfully'));
        navigate('/');
      } else {
        toast.error(t('You do have not permission to access'));
      }
    } catch (error) {
      toast.error(t('Something wrong please try again!'));
      console.error('Login failed:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        mt={{
          xs: 2,
          sm: 3,
        }}
        justifyContent="center"
        alignItems="center"
        spacing={{
          xs: 2,
          sm: 3,
        }}
      >
        <Container maxWidth="sm">
          <Grid
            container
            spacing={2}
          >
            <Grid xs={12}>
              <FormControl
                fullWidth
                error={!!errors.username}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  component="label"
                  htmlFor="username-input"
                  fontWeight={500}
                >
                  User name
                </Typography>
                <OutlinedInput
                  {...register('username')}
                  type="username"
                  id="username-input"
                  placeholder="Write your username"
                  startAdornment={
                    <InputAdornment position="start">
                      <PersonOutlineOutlinedIcon fontSize="small" />
                    </InputAdornment>
                  }
                />
                <FormHelperText>{errors.username?.message}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl
                fullWidth
                error={!!errors.password}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  component="label"
                  htmlFor="password-input"
                  fontWeight={500}
                >
                  Password
                </Typography>
                <OutlinedInput
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  id="password-input"
                  placeholder="Write your password"
                  endAdornment={
                    <InputAdornment position="end">
                      <ButtonIcon
                        variant="outlined"
                        color="secondary"
                        sx={{
                          mr: -0.8,
                        }}
                        onClick={handlePasswordVisibility}
                      >
                        {showPassword ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
                      </ButtonIcon>
                    </InputAdornment>
                  }
                />
                <FormHelperText>{errors.password?.message}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <Box
                alignItems="center"
                display="flex"
                justifyContent="space-between"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      name="terms"
                      color="primary"
                    />
                  }
                  label={
                    <>
                      <Typography variant="body1">{t('Keep me signed in')}</Typography>
                    </>
                  }
                />
                {/* <Link
                  href=""
                  onClick={(e) => e.preventDefault()}
                  underline="hover"
                >
                  {t('Recover password')}
                </Link> */}
              </Box>
            </Grid>
            <Grid xs={12}>
              <Button
                variant="contained"
                type="submit"
                size="large"
                fullWidth
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                }}
              >
                Sign in
                {isLoading && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '16px',
                    }}
                    color="common.white"
                  >
                    {' '}
                    <CircularProgress
                      style={{ height: '20px', width: '20px' }}
                      color={'inherit'}
                    />
                  </Box>
                )}
              </Button>
            </Grid>
            <Grid
              xs={12}
              textAlign="center"
            >
              <Typography
                component="span"
                color="text.secondary"
              >
                Not a Member yet?
              </Typography>{' '}
              <Link
                href="/register"
                underline="hover"
                fontWeight={500}
              >
                Sign up
              </Link>
            </Grid>
            <DocumentsUploadList
              files={files}
              setFiles={setFiles}
              setUploadFiles={setUploadFiles}
            />
            <DocumentsUploadListNoInput
              files={files}
              setFiles={setFiles}
              setUploadFiles={setUploadFiles}
            />
            
          </Grid>
        </Container>
      </Stack>
    </form>
  );
}
export default LoginForm;
