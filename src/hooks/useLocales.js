import { useTranslation } from 'react-i18next';
// @mui
import { enUS, arEG } from '@mui/material/locale';

// ----------------------------------------------------------------------

const LANGS = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: '/countries/us.svg',
  },
  {
    label: 'Arabic',
    value: 'ar',
    systemValue: arEG,
    icon: '/countries/eg.svg',
  },
];

export default function useLocales() {
  const { i18n, t: translate } = useTranslation();
  const langStorage = typeof localStorage !== 'undefined' ? localStorage.getItem('i18nextLng') : null;

  const currentLang = LANGS.find((_lang) => _lang.value === langStorage) || LANGS[1];

  const handleChangeLanguage = (newlang) => {
    i18n.changeLanguage(newlang);
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate,
    currentLang,
    allLang: LANGS,
  };
}
