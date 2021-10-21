import { useTranslation } from 'react-i18next';

type useURLReturn = {
    API_VERSION_URL: string;
    HOST_URL: string;
    API_URL: string;
};

const useURL = (): useURLReturn => {
    const { i18n } = useTranslation();
    const languageCode = '/' + i18n.language.split('-')[0];
    const API_VERSION_URL = process.env.REACT_APP_API_VERSION_URL as string;
    const HOST_URL = process.env.REACT_APP_HOST_URL as string;
    const API_URL = `${HOST_URL}${languageCode}${API_VERSION_URL}`;
    return { API_VERSION_URL, HOST_URL, API_URL };
};

export default useURL;
