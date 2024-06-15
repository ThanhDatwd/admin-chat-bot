import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DialogConfirmDelete from '../common/dialog-confirm-delete';

const UserFooterDropdown = ({ onDelete, onUpdate }) => {
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
          {/* <MenuItem sx={{ width: '100%' }}>
            <DialogConfirmDelete onConfirm={onDelete}>
              <Box width={'100%'}> {t('Xóa')}</Box>
            </DialogConfirmDelete>
          </MenuItem> */}
          <MenuItem
            onClick={() => {
              handleMenuClose();
              onUpdate();
            }}
          >
            {t('Cập nhật')}
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};
export default UserFooterDropdown;
