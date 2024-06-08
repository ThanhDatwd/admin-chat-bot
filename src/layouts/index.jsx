import { Box, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useCustomization } from 'src/hooks/use-customization';
import { useMenuItems } from 'src/router/menu-data';
import { getCurrentUser } from 'src/slices/auth';
import { getKnowledge } from 'src/slices/knowledge';
// Vertical Shells
import { VerticalShellsDark } from './vertical-shells-dark';

export const Layout = (props) => {
  const customization = useCustomization();
  const menuItems = useMenuItems();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const currentAdmin = useSelector((state) => state.auth.admin);
  const dispatch = useDispatch();

  if (!isAuth)
    return (
      <Navigate
        replace
        to="/login"
      />
    );

  useEffect(() => {
    dispatch(getKnowledge({ pageNumber: 0, pageSize: 20 }));
    dispatch(getCurrentUser());
    return () => {};
  }, []);

  switch (customization.layout) {
    // Vertical Shells

    default:
      return (
        <>
          {currentAdmin ? (
            <VerticalShellsDark
              menuItems={menuItems}
              {...props}
            />
          ) : (
            <Box
              sx={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CircularProgress style={{ height: '30px', width: '30px' }} />
            </Box>
          )}
        </>
      );
  }
};
Layout.propTypes = {
  children: PropTypes.node,
};
