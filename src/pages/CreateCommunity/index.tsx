import React from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { useFetch } from 'hooks';
import { useActions } from 'hooks';
import { AddressInputs, getLocation } from 'helpers/location';
import Loading from 'components/Loading';
import { CommunityType } from 'store/types';
import { useTranslation } from 'react-i18next';

export type CommunityCreationInputs = AddressInputs & {
    name: string;
    description: string;
};

const CreateCommunity: React.FC = () => {
    const { t } = useTranslation('form');
    const { loadCommunities } = useActions();
    const { state, post } = useFetch<CommunityType>();
    const { isLoading } = state;

    const CommunitySchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        description: Yup.string().min(3, 'Too Short!').required('Required'),
        houseNumber: Yup.string().min(1, 'Too Short!').max(10, 'Too Long!').required('Required'),
        street: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
        postCode: Yup.string().min(2, 'Too Short!').max(10, 'Too Long!').required('Required'),
        city: Yup.string().min(2, 'Too Short!').max(30, 'Too Long!').required('Required'),
        state: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!'),
        country: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
    });

    const create = async ({
        name,
        description,
        houseNumber,
        street,
        postCode,
        city,
        state,
        country,
    }: CommunityCreationInputs) => {
        const location = await getLocation({ houseNumber, street, postCode, city, state, country });
        post(
            '/communities',
            {
                name,
                description,
                house_number: houseNumber,
                street,
                post_code: postCode,
                city,
                state,
                country,
                formatted_address:
                    location.formatted_address || `${houseNumber} ${street} ${postCode} ${city} ${state} ${country}`,
                latitude: location.latitude,
                longitude: location.longitude,
            },
            loadCommunities,
        );
    };

    return (
        <>
            <h1>Create Community</h1>
            <Formik
                initialValues={{
                    name: '',
                    houseNumber: '',
                    street: '',
                    postCode: '',
                    city: '',
                    state: '',
                    country: '',
                    description: '',
                }}
                validationSchema={CommunitySchema}
                onSubmit={(values: CommunityCreationInputs) => {
                    create(values);
                }}
            >
                {({ errors, touched }) => (
                    <Form
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginLeft: '5%',
                            marginRight: '5%',
                        }}
                    >
                        <label htmlFor="name">{t('name')}</label>
                        <Field name="name" type="name" autoComplete="name" />
                        {errors.name && touched.name ? <div>{errors.name}</div> : null}

                        <label htmlFor="houseNumber">{t('house_number')}</label>
                        <Field name="houseNumber" autoComplete="houseNumber" className="form-control rounded-0" />
                        {errors.houseNumber && touched.houseNumber ? <div>{errors.houseNumber}</div> : null}

                        <label htmlFor="street">{t('street')}</label>
                        <Field name="street" autoComplete="street" className="form-control rounded-0" />
                        {errors.street && touched.street ? <div>{errors.street}</div> : null}

                        <label htmlFor="postCode">{t('post_code')}</label>
                        <Field name="postCode" autoComplete="postCode" className="form-control rounded-0" />
                        {errors.postCode && touched.postCode ? <div>{errors.postCode}</div> : null}

                        <label htmlFor="city">{t('city')}</label>
                        <Field name="city" autoComplete="city" className="form-control rounded-0" />
                        {errors.city && touched.city ? <div>{errors.city}</div> : null}

                        <label htmlFor="state">{t('state')}</label>
                        <Field name="state" autoComplete="state" className="form-control rounded-0" />
                        {errors.state && touched.state ? <div>{errors.state}</div> : null}

                        <label htmlFor="country">{t('country')}</label>
                        <Field name="country" autoComplete="country" className="form-control rounded-0" />
                        {errors.country && touched.country ? <div>{errors.country}</div> : null}

                        <label htmlFor="description">{t('description')}</label>
                        <Field
                            type="text"
                            name="description"
                            autoComplete="description"
                            className="form-control rounded-0"
                        />
                        {errors.description && touched.description ? <div>{errors.description}</div> : null}

                        <button type="submit">{t('submit')}</button>
                    </Form>
                )}
            </Formik>
            {isLoading && <Loading modal />}
        </>
    );
};

export default CreateCommunity;
