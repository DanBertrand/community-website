import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { useActions } from 'hooks';
import { useTranslation } from 'react-i18next';

type Values = {
    email: string;
    password: string;
};

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useActions();
    const { t } = useTranslation('form');

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
                <Form>
                    <label htmlFor="email">{t('email')}</label>
                    <Field name="email" type="email" autoComplete="email" />
                    {errors.email && touched.email ? <div>{errors.email}</div> : null}
                    <label htmlFor="password">{t('password')}</label>
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
                        {t('show_password')}
                    </label>
                    <button type="submit">{t('submit')}</button>
                </Form>
            )}
        </Formik>
    );
};

export default Login;
