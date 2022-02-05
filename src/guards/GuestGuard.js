import { useEffect } from 'react';
import PropTypes from 'prop-types';
// next
import { useRouter } from 'next/router';
// routes
import { PATH_DASHBOARD } from 'Routes/paths';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
  isAuthenticated: PropTypes.bool,
};

export default function GuestGuard({ children, isAuthenticated }) {
  const { push } = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      push(PATH_DASHBOARD.root);
    }
  }, [isAuthenticated]);

  return <>{children}</>;
}
