import { Box, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { useCustomization } from 'src/hooks/use-customization';
import { useMenuItems } from 'src/router/menu-data';
import { getCurrentUser } from 'src/slices/auth';
import { getKnowledge } from 'src/slices/knowledge';
import { VerticalShellsDark } from './vertical-shells-dark';

export const Layout = (props) => {
  const customization = useCustomization();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const currentAdmin = useSelector((state) => state.auth.admin);
  const [currentRole, setCurrentRole] = useState('');
  const dispatch = useDispatch();

  // if (!isAuth)
  //   return (
  //     <Navigate
  //       replace
  //       to="/login"
  //     />
  //   );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       await dispatch(getKnowledge({ pageNumber: 0, pageSize: 20 }));
  //       const response = await dispatch(getCurrentUser());
  //       setCurrentRole(response.data?.authorities[0]?.role ?? '');
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, [dispatch]);

  const menuItems = useMenuItems(currentRole);

  switch (customization.layout) {
    default:
      return (
        <>
          {!currentAdmin ? (
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
