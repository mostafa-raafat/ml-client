// routes
import { PATH_DASHBOARD } from 'Routes/paths';

// API
// ----------------------------------------------------------------------

export const HOST_API = process.env.NEXT_PUBLIC_HOST_API || '';

export const FIREBASE_API = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const GOOGLE_ANALYTICS_API = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.home; // as '/dashboard/app'

// LAYOUT
// ----------------------------------------------------------------------

export const DRAWER_WIDTH = 260;

export const DASHBOARD_HEADER_MOBILE = 64;
export const DASHBOARD_HEADER_DESKTOP = 92;
export const DASHBOARD_NAVBAR_WIDTH = 280;
export const DASHBOARD_NAVBAR_COLLAPSE_WIDTH = 88;

export const DASHBOARD_NAVBAR_ROOT_ITEM_HEIGHT = 48;
export const DASHBOARD_NAVBAR_SUB_ITEM_HEIGHT = 40;
export const DASHBOARD_NAVBAR_ICON_ITEM_SIZE = 22;

export const MAIN_HEADER_DESKTOP = 88;
export const MAIN_HEADER_MOBILE = 64;

export const Flow_MAIN_HEADER = 105;
export const Flow_LOGO_WIDTH = 180;
export const Flow_MENU_WIDTH = 180;
export const Flow_STEPPER_WIDTH = 562;

// SETTINGS
// ----------------------------------------------------------------------

export const defaultSettings = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeColorPresets: 'default',
  themeStretch: false,
};
