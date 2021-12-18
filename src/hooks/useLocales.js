import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
// '@mui
import { enUS, deDE, frFR } from '@mui/material/locale';
import useLocalStorage from './useLocalStorage';

// ----------------------------------------------------------------------

const LANGS = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_flag_en.svg',
  },
  {
    label: 'Egypt',
    value: 'eg',
    systemValue: deDE,

    icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_flag_de.svg',
  },
  {
    label: 'Franko',
    value: 'fk',
    systemValue: frFR,
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_flag_fr.svg',
  },
];

export default function useLocales(page = []) {
  const { push, asPath, route, locale } = useRouter();
  const { t: translate } = useTranslation(page);
  const [langStorage, setLangStorage] = useLocalStorage('i18nextLng', locale);
  const currentLang = LANGS.find((_lang) => _lang.value === langStorage);

  const handleChangeLanguage = (newLang) => {
    setLangStorage(newLang);
    push(route, asPath, { locale: newLang });
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate,
    currentLang,
    allLang: LANGS,
  };
}
