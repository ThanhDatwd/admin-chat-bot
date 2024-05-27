import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

export const RouterLink = forwardRef(function RouterLink(props, ref) {
  const { href, ...other } = props;
  return (
    <Link
      ref={ref}
      to={href}
      {...other}
    />
  );
});

// @ts-ignore
RouterLink.propTypes = {
  href: PropTypes.string.isRequired,
};
