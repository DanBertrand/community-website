export const headers = (token: string | null = null): Headers => {
    const header = new Headers({
        'Content-Type': 'application/json',
    });
    if (token) header.append('Authorization', `Bearer ${token}`);
    return header;
};
