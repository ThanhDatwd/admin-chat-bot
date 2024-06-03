import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import {
  alpha,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import AuthorizeChatbotQueryList from './authorize-chatbot-query-list';

const AuthorizeChatbotQuery = ({ open, setOpen, botName }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Dialog
        open={open}
        fullScreen={fullScreen}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="basic-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? alpha(theme.palette.neutral[25], 0.02) : 'neutral.25',
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="caption"
                fontWeight={600}
                color="text.secondary"
              >
                Gán người dùng cho bot
              </Typography>
              <Typography variant="h6">{botName}</Typography>
            </Box>
            <Button variant="outlined">Nhập Excel</Button>
          </Box>
        </DialogTitle>
        <Divider />
        <Box>
          <FormControl
            variant="outlined"
            fullWidth
          >
            <OutlinedInput
              sx={{
                '.MuiOutlinedInput-notchedOutline': {
                  border: 0,
                  borderRadius: 0,
                },
              }}
              type="text"
              placeholder={t('Thêm người dùng có quyền truy vấn bot')}
            />
          </FormControl>
        </Box>
        <DialogContent
          dividers
          sx={{
            p: 0,
          }}
        >
          <AuthorizeChatbotQueryList />
        </DialogContent>
        <DialogActions
          sx={{
            p: 0,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? alpha(theme.palette.neutral[25], 0.02) : 'neutral.25',
          }}
        >
          <Button
            color="secondary"
            autoFocus
            size="large"
            fullWidth
            onClick={handleClose}
          >
            Đóng
          </Button>
          <Button
            color="primary"
            autoFocus
            size="large"
            fullWidth
            onClick={handleClose}
          >
            Gán quyền
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default AuthorizeChatbotQuery;
