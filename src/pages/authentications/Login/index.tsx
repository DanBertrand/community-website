import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { useActions } from 'hooks';

type Values = {
    email: string;
    password: string;
};

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useActions();

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            onSubmit={({ email, password }: Values) => {
                login({ email, password });
            }}
        >
            {({ errors, touched }) => (
                <Form style={{ paddingTop: 200 }}>
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
