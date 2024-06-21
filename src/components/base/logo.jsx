import { alpha, Badge, Box, Link, Typography, useTheme } from '@mui/material';
import KatechLogo from '../../assets/images/logo/logo.png';
import { RouterLink } from './router-link';

export const Logo = ({ dark = false, isLinkStatic = false }) => {
  const theme = useTheme();
  const color = dark
    ? theme.palette.common.white
    : theme.palette.mode === 'dark'
      ? theme.palette.common.white
      : theme.palette.common.black;
  const linkProps = isLinkStatic
    ? {
        href: '',
        onClick: (e) => e.preventDefault(),
      }
    : {
        href: '/',
      };
  return (
    <Link
        component={RouterLink}
        {...linkProps}
        sx={{
          color: color,
          
          '&:hover .MuiBadge-badge': {
            opacity: 1,
            visibility: 'initial',
          },
        }}
      >
    <Box sx={{
          color: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap:'16px'
        }}>
        <img
          
          src={KatechLogo}
          style={{ height: 40, width: 40 }}
          alt=""
        />
        <Typography
          component="span"
          sx={{
            fontSize: '18px',
           
            lineHeight: '18px',
          }}
          fontWeight={700}
        >
          {/* KATECH */}
        </Typography>
    </Box>
      </Link>
  );
};
