// components
import { Icon } from '@iconify/react';
import { PATH_DASHBOARD, PATH_PAGE } from 'Routes/paths';
// ----------------------------------------------------------------------

const ICONS = {
  plus: <Icon icon="akar-icons:plus" />,
  home: <Icon icon="bx:bx-home" />,
  recipients: <Icon icon="bx:bx-group" />,
  account: <Icon icon="bx:bx-user" />,
  gift: <Icon icon="bx:bx-gift" />,
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: '',
    items: [
      { title: 'Home', path: PATH_DASHBOARD.root, icon: ICONS.home },
      { title: 'Recipients', path: PATH_DASHBOARD.recipients, icon: ICONS.recipients },
      { title: 'Account', path: PATH_DASHBOARD.account, icon: ICONS.account },
      { title: 'Invite & earn 50 GBP', path: PATH_PAGE.invite, icon: ICONS.gift },
    ],
  },

  // Balances
  // ----------------------------------------------------------------------
  {
    subheader: 'balances',
    items: [
      {
        title: 'Open a balance',
        path: PATH_DASHBOARD.user.balances,
        icon: ICONS.plus,
      },
    ],
  },

  // Jars
  // ----------------------------------------------------------------------
  {
    subheader: 'jars',
    items: [
      {
        title: 'Open a jar',
        path: PATH_DASHBOARD.user.jars,
        icon: ICONS.plus,
      },
    ],
  },
];

export default sidebarConfig;
