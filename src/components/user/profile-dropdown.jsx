import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import {
  alpha,
  Box,
  Button,
  Divider,
  ListItemText,
  Menu,
  MenuItem,
  useTheme
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AvatarTitleDescriptionAlternate from './avatar-title-description-alternate';
import api from 'src/api/axios';
import { useDispatch } from 'react-redux';
import { logOut } from 'src/slices/auth';
import { useNavigate } from 'react-router';
import { authApi } from 'src/api/auth';
import UpdateUserDialog from './user-update-dialog';

const generateRandomData = () =>
  Array.from(
    {
      length: 12,
    },
    () => Math.floor(Math.random() * 1000)
  );
const menuItems = ['Cập nhật thông tin'];
export const ProfileDropdown = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const [openDialogUpdate, setOpenDialogUpdate] = useState(false);

  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      await authApi.logout()
      dispatch(logOut());

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };
  return (
    <>
      <Menu
        id="settings-menu"
        component="div"
        anchorEl={anchorEl}
        open={!!open}
        onClose={onClose}
        MenuListProps={{
          'aria-labelledby': 'settings-button',
          sx: {
            p: 0,
          },
        }}
        anchorOrigin={
          props.anchorOrigin || {
            vertical: 'top',
            horizontal: 'right',
          }
        }
        transformOrigin={
          props.transformOrigin || {
            vertical: 'top',
            horizontal: 'right',
          }
        }
        sx={{
          '& .MuiMenu-list': {
            width: 280,
          },
          '& .MuiMenuItem-root': {
            borderRadius: theme.shape.borderRadius,
            pr: theme.spacing(0.5),
            mx: theme.spacing(1),
            '& .MuiSvgIcon-root': {
              opacity: 0.5,
            },
            '&.Mui-selected, &.Mui-selected:hover, &:hover, &.MuiButtonBase-root:active': {
              background: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.dark,
              '& .MuiSvgIcon-root': {
                opacity: 0.8,
              },
            },
          },
        }}
        {...other}
      >
        <Box
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? alpha(theme.palette.neutral[25], 0.02) : 'neutral.25',
            p: 1.5,
            overflow: 'hidden',
          }}
        >
          <AvatarTitleDescriptionAlternate/>
        </Box>
        <Divider
          sx={{
            mb: 1,
          }}
        />
          <MenuItem
            component="div"
            onClick={()=>{
              onClose()
              setOpenDialogUpdate(true)
            }}
            sx={{
              '&:hover .MuiListItemText-primary': {
                color: theme.palette.mode === 'dark' ? 'text.primary' : 'primary.main',
              },
            }}
          >
            <ListItemText
              primaryTypographyProps={{
                fontWeight: 500,
              }}
              primary={t("Cập nhật thông tin")}
            />
            <ChevronRightTwoToneIcon />
          </MenuItem>
        <Divider />
        
        <Box m={1}>
          <Button
            color="secondary"
            fullWidth
            onClick={() => {
              onClose?.();
              handleLogout();
            }}
          >
            <LockOpenTwoToneIcon
              sx={{
                mr: 1,
              }}
            />
            {t('Đăng xuất')}
          </Button>
        </Box>
      </Menu>
      <UpdateUserDialog
          open={openDialogUpdate}
          onClose={() => setOpenDialogUpdate(false)}
        />
    </>
  );
};
ProfileDropdown.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
