import { Box } from '@mui/material';
import PropTypes from 'prop-types';

export const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  );
};
Layout.propTypes = {
  children: PropTypes.node,
};
