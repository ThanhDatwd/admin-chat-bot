import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import {
  alpha,
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  ListSubheader,
  Menu,
  MenuItem,
  Switch,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ChatbotFooterDropdown = ({ onSelect, setOpenAuthorizeChatbotQuery }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    onSelect();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
  };

  const handleAuthorize = () => {
    handleMenuClose();
    setOpenAuthorizeChatbotQuery(true);
  };

  return (
    <Box>
      <IconButton
        color="primary"
        aria-label="more"
        aria-controls="bot-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
      >
        <MoreVertTwoToneIcon />
      </IconButton>
      <Menu
        id="bot-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleAuthorize}>{t('Gán người dùng cho bot')}</MenuItem>
        <MenuItem onClick={handleEdit}>{t('Xem chi tiết')}</MenuItem>
        <MenuItem onClick={handleMenuClose}>{t('Xóa')}</MenuItem>
      </Menu>
    </Box>
  );
};
export default ChatbotFooterDropdown;
