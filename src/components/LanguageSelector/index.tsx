import React from 'react';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
// import flagFR from 'assets/images/flags/fr.svg';
// import flagDE from 'assets/images/flags/de.svg';
// import flagGB from 'assets/images/flags/gb.svg';

const languages = [
    { id: 1, name: 'English', code: 'en-GB' },
    { id: 2, name: 'French', code: 'fr-FR' },
    { id: 3, name: 'Deutsch', code: 'de-DE' },
];

const LanguageSelector = (): JSX.Element => {
    const { i18n } = useTranslation();
    const [value, setValue] = React.useState(
        languages.find((lng) => lng.code === Cookies.get('i18n-language')) || languages[0],
    );

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLanguage = languages.find((lng) => lng.code === e.target.value);
        if (newLanguage) {
            i18n.changeLanguage(newLanguage.code);
            setValue(newLanguage);
        }
    };

    return (
        <select value={value.code} onChange={handleChange}>
            {languages.map((lng) => (
                <option value={lng.code} key={lng.id}>
                    {lng.name}
                </option>
            ))}
        </select>
    );
};

export default LanguageSelector;
