import React from 'react';
import { useTranslation } from 'react-i18next';

const useURL = () => {
    const { i18n } = useTranslation();
    const languageCode = '/' + i18n.language.split('-')[0];
    const API_VERSION_URL = process.env.REACT_APP_API_VERSION_URL;
    const HOST_URL = process.env.REACT_APP_HOST_URL;
    const API_URL = `${HOST_URL}${languageCode}${API_VERSION_URL}`;
    return { API_VERSION_URL, HOST_URL, API_URL };
};

export default useURL;
