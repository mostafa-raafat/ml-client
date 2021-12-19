import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
// '@mui
import { enUS, frFR, arEG } from '@mui/material/locale';
import useLocalStorage from './useLocalStorage';
import useSettings from './useSettings';

// ----------------------------------------------------------------------

const LANGS = {
  en: {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_flag_en.svg',
    dir: 'ltr',
  },
  eg: {
    label: 'Egypt',
    value: 'eg',
    systemValue: arEG,
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_flag_de.svg',
    dir: 'rtl',
  },
  fk: {
    label: 'Franko',
    value: 'fk',
    systemValue: frFR,
    icon: 'https://minimal-assets-api.vercel.app/assets/icons/ic_flag_fr.svg',
    dir: 'ltr',
  },
};

export default function useLocales(page = []) {
  const { push, asPath, route, locale } = useRouter();
  const { t: translate } = useTranslation(page);
  const [langStorage, setLangStorage] = useLocalStorage('i18nextLng', locale);
  const currentLang = LANGS[langStorage];
  const allLang = Object.values(LANGS);
  const { onChangeDirection } = useSettings();

  const handleChangeLanguage = (newLang) => {
    setLangStorage(newLang);
    onChangeDirection({ target: { value: LANGS[newLang].dir } });
    push(route, asPath, { locale: newLang });
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate,
    currentLang,
    allLang,
  };
}
