import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// hooks
import useAuth from 'Hooks/useAuth';
// pages
import Login from 'Pages/auth/login';
// components
import LoadingScreen from 'Components/LoadingScreen';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
  isAuthenticated: PropTypes.bool,
};

export default function AuthGuard({ children, isAuthenticated }) {
  const { isInitialized } = useAuth();
  const { pathname, push } = useRouter();
  const [requestedLocation, setRequestedLocation] = useState(null);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      setRequestedLocation(null);
      push(requestedLocation);
    }
  }, [pathname, push, requestedLocation]);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  return <>{children}</>;
}
