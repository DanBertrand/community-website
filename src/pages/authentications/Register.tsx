import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchToRegister } from '../../stores/authentication/authMiddleware';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const register = async () => {
        const data = {
            user: {
                email: email,
                password: password,
            },
        };
        console.log('REGISTERING SOON:', data);
        dispatch(fetchToRegister(data));
    };

    return (
        <div className="Register">
            <h1>This is register</h1>
            <form>
                <input
                    type="text"
                    placeholder="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />{' '}
                <br />
                <input type="button" onClick={register} value="Valider l'inscription" />
            </form>
        </div>
    );
};

export default Register;
