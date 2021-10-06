type FetchResponse = {
    data?: { user: { id: number; email: string } };
    message?: string;
    error?: string;
};

export const testToken = 'Bearer *******test_token********';

export const mockFetch = (response: FetchResponse, status?: boolean, token?: boolean): void => {
    const globalRef: any = global;
    globalRef.fetch = jest.fn(() =>
        Promise.resolve({
            ok: status,
            headers: {
                get: (string: string) => (token && string === 'authorization' ? testToken : ''),
            },
            json: () => Promise.resolve(response),
        }),
    );
};
