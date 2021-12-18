import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import NextLink from 'next/link';
// material
import { Link as MLink } from '@mui/material';

// ----------------------------------------------------------------------

const Link = forwardRef(({ href, as, prefetch, ...props }, ref) => {
  return (
    <NextLink href={href} as={as} prefetch={prefetch} passHref>
      <MLink ref={ref} {...props} />
    </NextLink>
  );
});

Link.displayName = 'Link';

Link.defaultProps = {
  href: '#',
  prefetch: false,
};

Link.propTypes = {
  href: PropTypes.string,
  as: PropTypes.string,
  prefetch: PropTypes.bool,
};

export default Link;
