// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/user/account';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  forgetPassword: path(ROOTS_AUTH, '/forget-password'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verifyCode: path(ROOTS_AUTH, '/verify-code'),
};

export const PATH_PAGE = {
  invite: '/invite',
  help: '/help',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  account: '/account',
  recipients: '/recipients',
  user: {
    balances: path(ROOTS_DASHBOARD, '/balances#create'),
    jars: path(ROOTS_DASHBOARD, '/jars#create'),
    sendMoney: '/send#sourceaccount',
  },
  profile: '/profile',
  settings: '/settings',
};

// ----------------------------------------------------------------------
