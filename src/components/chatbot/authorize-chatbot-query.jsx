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
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DecentralizationTable from '../decentralization/decentralization-table';
import AuthorizeChatbotQueryList from './authorize-chatbot-query-list';

const AuthorizeChatbotQuery = ({ open, setOpen, botName }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddUser = () => {
    if (newUser.trim()) {
      setUsers([...users, newUser.trim()]);
      setNewUser('');
    }
  };

  const handleInputChange = (event) => {
    setNewUser(event.target.value);
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
        <DialogTitle>
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
              <Typography variant="h5">{botName}</Typography>
            </Box>
            {/* <Button variant="outlined">Nhập Excel</Button> */}
          </Box>
        </DialogTitle>
        <Box
          sx={{
            px: 2,
            pb: 2,
            borderRadius: 8,
          }}
        >
          <FormControl
            variant="outlined"
            fullWidth
          >
            <OutlinedInput
              type="text"
              placeholder={t('Thêm người dùng có quyền truy vấn bot')}
              onChange={handleInputChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleAddUser}
                    edge="end"
                  >
                    <SearchTwoToneIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <Typography
          variant="h5"
          sx={{
            mx: 2,
            mb: 1,
          }}
        >
          Những người dùng sau sẽ có quyền truy vấn Bot
        </Typography>
        <DialogContent
          dividers
          sx={{
            p: 0,
          }}
        >
          <AuthorizeChatbotQueryList users={users} />
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
