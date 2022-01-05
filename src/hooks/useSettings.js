import { useContext } from 'react';
import { SettingsContext } from 'Contexts/SettingsContext';

// ----------------------------------------------------------------------

const useSettings = () => useContext(SettingsContext);

export default useSettings;
