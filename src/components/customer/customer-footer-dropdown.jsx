import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import {
  Box,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CreateAdminOrgDialog from './create-admin-org-dialog';

const CustomerFooterDropdown = ({customer}) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = useState(false);


  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
  };

  return (
   <>
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
        <MenuItem onClick={handleEdit}>{t('Xem chi tiết')}</MenuItem>
        <MenuItem onClick={handleMenuClose}>{t('Xóa')}</MenuItem>
        <MenuItem onClick={()=>{
          setOpenDialog(true)
          handleMenuClose()
        }}>{t('Tạo tài khoản quản trị')}</MenuItem>
      </Menu>
    </Box>
    <CreateAdminOrgDialog
       customer={customer}
         open={openDialog}
        onClose={()=>setOpenDialog(false)}
    />
   </>
  );
};
export default CustomerFooterDropdown;
