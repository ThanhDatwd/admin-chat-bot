import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import stylisRTLPlugin from 'stylis-plugin-rtl';

const styleCache = () =>
  createCache({
    key: 'rtl',
    prepend: true,
    // @ts-ignore
    stylisPlugins: [stylisRTLPlugin],
  });
export const RtlDirection = (props) => {
  const { children, direction = 'ltr' } = props;
  useEffect(() => {
    document.dir = direction;
  }, [direction]);
  if (direction === 'rtl') {
    return <CacheProvider value={styleCache()}>{children}</CacheProvider>;
  }
  return <>{children}</>;
};
RtlDirection.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(['ltr', 'rtl']),
};
