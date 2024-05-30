import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useCustomization } from 'src/hooks/use-customization';
import { useMenuItems } from 'src/router/menu-data';
// Vertical Shells
import { VerticalShellsDark } from './vertical-shells-dark';

export const Layout = (props) => {
  const customization = useCustomization();
  const menuItems = useMenuItems();
  const isAuth = useSelector((state) => state.auth.isAuth);

  if (!isAuth)
    return (
      <Navigate
        replace
        to="/login"
      />
    );
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
