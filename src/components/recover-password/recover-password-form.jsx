import { zodResolver } from '@hookform/resolvers/zod';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import {
  Box,
  Button,
  Container,
  Divider,
  FilledInput,
  FormControl,
  FormHelperText,
  Unstable_Grid2 as Grid,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { z } from 'zod';

const schema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email({ message: 'Invalid email address' })
    .regex(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/, { message: 'Invalid email address' }),
});
function RecoverPasswordForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  });
  const onSubmit = () => {
    toast.success('Password recovery email sent');
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        py={{
          xs: 2,
          sm: 3,
        }}
        mx={{
          xl: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h3">Recover password</Typography>
          <Typography
            variant="h6"
            fontWeight={400}
          >
            Enter your email to reset your password
          </Typography>
          <Divider
            sx={{
              my: 2,
            }}
          />
        </Container>
        <Stack
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
                  error={!!errors.email}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="label"
                    htmlFor="email-input"
                    fontWeight={500}
                  >
                    Email
                  </Typography>
                  <FilledInput
                    {...register('email')}
                    type="email"
                    hiddenLabel
                    id="email-input"
                    placeholder="Write your email"
                    startAdornment={
                      <InputAdornment position="start">
                        <MailOutlineRoundedIcon fontSize="small" />
                      </InputAdornment>
                    }
                  />
                  <FormHelperText>{errors.email?.message}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  fullWidth
                >
                  Send Reset Link
                </Button>
              </Grid>
              <Grid xs={12}>
                <Grid xs={12}>
                  <Button
                    size="large"
                    startIcon={<KeyboardBackspaceRoundedIcon />}
                    onClick={() => navigate('/login')}
                  >
                    Return to sign in
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Stack>
      </Box>
    </form>
  );
}
export default RecoverPasswordForm;
