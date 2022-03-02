import PropTypes from 'prop-types';
// components
import MainLayout from './main';
import FlowLayout from './flow';
import DashboardLayout from './dashboard';
import LogoOnlyLayout from './LogoOnlyLayout';

// ----------------------------------------------------------------------

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['dashboard', 'main', 'logoOnly', 'flow']),
};

export default function Layout({ variant = 'dashboard', children }) {
  if (variant === 'logoOnly') {
    return <LogoOnlyLayout> {children} </LogoOnlyLayout>;
  }

  if (variant === 'main') {
    return <MainLayout>{children}</MainLayout>;
  }

  if (variant === 'flow') {
    return <FlowLayout>{children}</FlowLayout>;
  }

  return <DashboardLayout> {children} </DashboardLayout>;
}
