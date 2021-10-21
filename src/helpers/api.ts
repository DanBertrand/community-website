export const headers = (token: string | null = null): Headers => {
    const header = new Headers({
        'Content-Type': 'application/json',
    });
    if (token) {
        header.append('Authorization', `Bearer ${token}`);
        header.append('Accept', 'application/json');
    }
    return header;
};

export const API_VERSION_URL = process.env.REACT_APP_API_VERSION_URL;
export const HOST_URL = process.env.REACT_APP_HOST_URL;

export const get = (string: string): string | undefined => {
    if (string === 'API_URL') {
        const language = localStorage.getItem('i18n-language');
        return `${HOST_URL}/${language?.split('-')[0]}${API_VERSION_URL}`;
    }
};
