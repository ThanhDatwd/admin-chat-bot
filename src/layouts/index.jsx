import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useCustomization } from 'src/hooks/use-customization';
import { useMenuItems } from 'src/router/menu-data';
import { getKnowledge } from 'src/slices/knowledge';
// Vertical Shells
import { VerticalShellsDark } from './vertical-shells-dark';

export const Layout = (props) => {
  const customization = useCustomization();
  const menuItems = useMenuItems();
  const isAuth = useSelector((state) => state.auth.isAuth);
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

    return () => {};
  }, []);

  switch (customization.layout) {
    // Vertical Shells

    default:
      return (
        <VerticalShellsDark
          menuItems={menuItems}
          {...props}
        />
      );
  }
};
Layout.propTypes = {
  children: PropTypes.node,
};
