import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import NextLink from 'next/link';
// material
import { Button } from '@mui/material';

const LinkButton = forwardRef(({ href, as, prefetch, locale, ...props }, ref) => (
  <NextLink href={href} as={as} prefetch={prefetch} locale={locale} passHref>
    <Button ref={ref} {...props} />
  </NextLink>
));

LinkButton.displayName = 'LinkButton';

LinkButton.defaultProps = {
  href: '#',
  prefetch: false,
};

LinkButton.propTypes = {
  href: PropTypes.string,
  locale: PropTypes.string,
  as: PropTypes.string,
  prefetch: PropTypes.bool,
};

export default LinkButton;
