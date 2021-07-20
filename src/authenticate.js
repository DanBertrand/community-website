export const register = async () => {
    console.log('register');
    const data = {
        email: email,
        password: password,
    };
    const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const user = await response.json();
    console.log('user', user);
};
