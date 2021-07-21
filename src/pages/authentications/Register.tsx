import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchToRegister } from '../../stores/authentication/authMiddleware';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { StoreStateType } from '../../stores';
import { useHistory } from 'react-router-dom';

type Values = {
    email: string;
    password: string;
};

const Register: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();

    const state = useSelector((state: StoreStateType) => state.auth);
    const dispatch = useDispatch();
    console.log('Store', state);

    const register = async (values: Values) => {
        const data = {
            user: values,
        };
        if (await dispatch(fetchToRegister(data))) {
            history.push('/');
        }
    };

    const RegisterSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
    });

    return (
        <div>
            <h1>This is register</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={RegisterSchema}
                onSubmit={(values: Values) => {
                    console.log(values);
                    register(values);
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
        </div>
    );
};

export default Register;
