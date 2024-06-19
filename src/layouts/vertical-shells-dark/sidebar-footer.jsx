import EventTwoToneIcon from '@mui/icons-material/EventTwoTone';
import PowerSettingsNewTwoToneIcon from '@mui/icons-material/PowerSettingsNewTwoTone';
import SmsTwoToneIcon from '@mui/icons-material/SmsTwoTone';
import { alpha, Box, IconButton, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { authApi } from 'src/api/auth';
import api from 'src/api/axios';
import { TooltipLight } from 'src/components/base/styles/tooltips';
import { logOut } from 'src/slices/auth';
import { neutral } from 'src/theme/colors';

const FooterButton = ({ icon, tooltipText }) => {
  const { t } = useTranslation();

  return (
    <TooltipLight
      placement="top"
      arrow
      title={t(tooltipText)}
    >
      <IconButton
        sx={{
          background: alpha(neutral[800], 0.1),
          color: neutral[400],
          textAlign: 'left',
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: alpha(neutral[600], 0.2),
          '&:hover': {
            color: neutral[100],
            background: alpha(neutral[700], 0.12),
            borderColor: alpha(neutral[600], 0.3),
          },
        }}
      >
        {icon}
      </IconButton>
    </TooltipLight>
  );
};

const SidebarFooter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await authApi.logout();
      dispatch(logOut());

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };
  return (
    <Stack
      direction="row"
      py={1}
      spacing={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={6}
      position="relative"
    >
      <FooterButton
        icon={<EventTwoToneIcon fontSize="small" />}
        tooltipText="Events Calendar"
      />
      <FooterButton
        icon={<SmsTwoToneIcon fontSize="small" />}
        tooltipText="Messenger"
      />
      <FooterButton
        icon={
          <PowerSettingsNewTwoToneIcon
            onClick={() => handleLogout()}
            fontSize="small"
          />
        }
        tooltipText="Logout"
      />
    </Stack>
  );
};
export default SidebarFooter;
