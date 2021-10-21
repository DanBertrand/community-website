import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { useActions } from 'hooks';
import { useTranslation } from 'react-i18next';

type Values = {
    email: string;
    password: string;
};

const Register: React.FC = () => {
    const { t } = useTranslation('form');
    const [showPassword, setShowPassword] = useState(false);
    const { signup } = useActions();

    const register = async ({ email, password }: Values) => {
        signup({ email, password });
    };

    const RegisterSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
    });

    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={RegisterSchema}
                onSubmit={(values: Values) => {
                    register(values);
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
        </div>
    );
};

export default Register;
