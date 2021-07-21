import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchToLogin } from '../../stores/authentication/authMiddleware';
import { Formik, Field, Form } from 'formik';
import { useHistory } from 'react-router-dom';

type Values = {
    email: string;
    password: string;
};

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);

    const login = async (values: Values) => {
        const data = {
            user: values,
        };
        console.log('LOGIN SOON:', data);

        if (await dispatch(fetchToLogin(data))) {
            history.push('/');
        }
    };
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            onSubmit={(values: Values) => {
                console.log(values);
                login(values);
            }}
        >
            {({ errors, touched }) => (
                <Form>
                    <label htmlFor="email">Email</label>
                    <Field name="email" type="email" autoComplete="email" />
                    {errors.email && touched.email ? <div>{errors.email}</div> : null}
                    <label htmlFor="password">Password</label>
                    <Field
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        autoComplete="password"
                        className="form-control rounded-0"
                    />
                    {errors.password && touched.password ? <div>{errors.password}</div> : null}
                    <label>
                        <Field
                            onChange={() => setShowPassword(!showPassword)}
                            type="checkbox"
                            checked={showPassword}
                            name="toggle"
                        />
                        Show password
                    </label>
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    );
};

export default Login;
