import { useTranslation } from 'react-i18next';
// @mui
import { enUS, arEG } from '@mui/material/locale';
import { axiosAuth, axiosPublic } from 'Utils/axios';

// ----------------------------------------------------------------------

const LANGS = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: 'us.png',
  },
  {
    label: 'Arabic',
    value: 'ar',
    systemValue: arEG,
    icon: 'eg.png',
  },
];

export default function useLocales() {
  const { i18n, t: translate } = useTranslation();
  const langStorage = typeof localStorage !== 'undefined' ? localStorage.getItem('i18nextLng') : null;

  const currentLang = LANGS.find((_lang) => _lang.value === langStorage) || LANGS[1];

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    axiosAuth.defaults.headers.common.language = lang;
    axiosPublic.defaults.headers.common.language = lang;
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate,
    currentLang,
    allLang: LANGS,
  };
}
