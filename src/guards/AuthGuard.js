import PropTypes from 'prop-types';
import { useState } from 'react';
import { useRouter } from "next/router";
// hooks
import useAuth from 'Hooks/useAuth';
// pages
import Login from 'Pages/auth/Login';
// components
import LoadingScreen from 'Components/LoadingScreen';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();
  const { pathname, push } = useRouter();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    push(requestedLocation)
  }

  return <>{children}</>;
}
