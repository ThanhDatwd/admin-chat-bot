import PropTypes from 'prop-types';
import { useCustomization } from 'src/hooks/use-customization';
import { useMenuItems } from 'src/router/menu-data';
// Vertical Shells
import { VerticalShellsDark } from './vertical-shells-dark';

export const Layout = (props) => {
  const customization = useCustomization();
  const menuItems = useMenuItems();
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
