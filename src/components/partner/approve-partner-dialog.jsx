import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import HowToRegTwoToneIcon from '@mui/icons-material/HowToRegTwoTone';
import MarkChatReadTwoToneIcon from '@mui/icons-material/MarkChatReadTwoTone';
import {
  alpha,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FilledInput,
  FormControl,
  IconButton,
  Menu,
  OutlinedInput,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AvatarGradient } from 'src/components/base/styles/avatar';
import { ButtonIcon } from 'src/components/base/styles/button-icon';
import ApprovePartnerDialogList from './approve-partner-dialog-list';

const ApprovePartnerDialog = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (item) => {
    handleClose();
  };

  const partnerData = [
    {
      avatar: 'https://example.com/avatars/avatar1.png',
      partner_name: 'Nguyen Van A',
      contact: {
        phone: '0912345678',
        email: 'nguyenvana@example.com',
      },
      rejection_count: 3,
    },
    {
      avatar: 'https://example.com/avatars/avatar2.png',
      partner_name: 'Tran Thi B',
      contact: {
        phone: '0987654321',
        email: 'tranthib@example.com',
      },
      rejection_count: 1,
    },
    {
      avatar: 'https://example.com/avatars/avatar3.png',
      partner_name: 'Le Minh C',
      contact: {
        phone: '0934567890',
        email: 'leminhc@example.com',
      },
      rejection_count: 2,
    },
    {
      avatar: 'https://example.com/avatars/avatar4.png',
      partner_name: 'Pham Thi D',
      contact: {
        phone: '0976543210',
        email: 'phamthid@example.com',
      },
      rejection_count: 4,
    },
    {
      avatar: 'https://example.com/avatars/avatar5.png',
      partner_name: 'Hoang Van E',
      contact: {
        phone: '0923456789',
        email: 'hoangvane@example.com',
      },
      rejection_count: 0,
    },
  ];

  return (
    <>
      <Tooltip
        title={t('Duyệt tài khoản')}
        arrow
      >
        <IconButton
          color="primary"
          onClick={() => handleClickOpen()}
        >
          <HowToRegTwoToneIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="basic-dialog-title"
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle id="basic-dialog-title">Duyệt đối tác</DialogTitle>
        <Divider />
        <FormControl
          fullWidth
          variant="outlined"
        >
          <OutlinedInput
            id="name-input"
            sx={{
              '.MuiOutlinedInput-notchedOutline': {
                border: 0,
                borderRadius: 0,
              },
            }}
            hiddenLabel
            multiline
            minRows={1}
            maxRows={3}
            placeholder="Lý do duyệt"
          />
        </FormControl>
        <Divider />
        <ApprovePartnerDialogList data={partnerData} />
        <Divider />
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
          >
            Từ chối
          </Button>
          <Button
            onClick={handleClose}
            color="primary"
          >
            Phê duyệt
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ApprovePartnerDialog;
