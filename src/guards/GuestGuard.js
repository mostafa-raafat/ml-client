import PropTypes from 'prop-types';
import { useRouter } from "next/router";
// hooks
import useAuth from 'Hooks/useAuth';
// routes
import { PATH_DASHBOARD } from 'Routes/paths';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default function GuestGuard({ children }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (isAuthenticated) {
    router.push(PATH_DASHBOARD.root)
  }

  return <>{children}</>;
}
