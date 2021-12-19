// components
import { Icon } from '@iconify/react';
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
      { title: 'Home', path: '/user/account', icon: ICONS.home },
      { title: 'Recipients', path: '/recipients', icon: ICONS.recipients },
      { title: 'Account', path: '/account', icon: ICONS.account },
      { title: 'Invite & earn 50 GBP', path: '/invite', icon: ICONS.gift },
    ],
  },

  // Balances
  // ----------------------------------------------------------------------
  {
    subheader: 'balances',
    items: [
      {
        title: 'Open a balance',
        path: '/dashboard/user',
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
        path: '/dashboard/user',
        icon: ICONS.plus,
      },
    ],
  },
];

export default sidebarConfig;
