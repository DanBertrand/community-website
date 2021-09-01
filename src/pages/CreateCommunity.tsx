import React from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import useFetch from '../hooks/useFetch';
import { useActions } from '../hooks/useActions';
import { AddressInputs, getLocation } from '../tools/location';
import { ContentContainer, PageContainer } from '../styles/index';
import Loading from '../components/Loading';

type CommunityCreationInputs = AddressInputs & {
    name: string;
    description: string;
};

const CreateCommunity: React.FC = () => {
    const [loading, setLoading] = React.useState(false);
    const { loadCommunities } = useActions();
    const { post, isLoading } = useFetch();

    const CommunitySchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        description: Yup.string().min(3, 'Too Short!').required('Required'),
        houseNumber: Yup.string().min(1, 'Too Short!').max(10, 'Too Long!').required('Required'),
        street: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
        postCode: Yup.string().min(2, 'Too Short!').max(10, 'Too Long!').required('Required'),
        city: Yup.string().min(2, 'Too Short!').max(15, 'Too Long!').required('Required'),
        state: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!'),
        country: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
    });

    React.useEffect(() => {
        if (!isLoading) {
            setLoading(false);
        }
    }, [isLoading]);

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
        setLoading(true);
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
                address: location.address,
                latitude: location.latitude,
                longitude: location.longitude,
            },
            loadCommunities,
        );
    };

    return (
        <PageContainer>
            <ContentContainer>
                <h1>Create Community</h1>
                <Formik
                    initialValues={{
                        name: '',
                        description: '',
                        houseNumber: '',
                        street: '',
                        postCode: '',
                        city: '',
                        state: '',
                        country: '',
                    }}
                    validationSchema={CommunitySchema}
                    onSubmit={(values: CommunityCreationInputs) => {
                        create(values);
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <label htmlFor="name">Name</label>
                            <Field name="name" type="name" autoComplete="name" />
                            {errors.name && touched.name ? <div>{errors.name}</div> : null}

                            <label htmlFor="houseNumber">House Number</label>
                            <Field name="houseNumber" autoComplete="houseNumber" className="form-control rounded-0" />
                            {errors.houseNumber && touched.houseNumber ? <div>{errors.houseNumber}</div> : null}

                            <label htmlFor="street">Street</label>
                            <Field name="street" autoComplete="street" className="form-control rounded-0" />
                            {errors.street && touched.street ? <div>{errors.street}</div> : null}

                            <label htmlFor="postCode">Post Code</label>
                            <Field name="postCode" autoComplete="postCode" className="form-control rounded-0" />
                            {errors.postCode && touched.postCode ? <div>{errors.postCode}</div> : null}

                            <label htmlFor="city">City</label>
                            <Field name="city" autoComplete="city" className="form-control rounded-0" />
                            {errors.city && touched.city ? <div>{errors.city}</div> : null}

                            <label htmlFor="state">State</label>
                            <Field name="state" autoComplete="state" className="form-control rounded-0" />
                            {errors.state && touched.state ? <div>{errors.state}</div> : null}

                            <label htmlFor="country">Country</label>
                            <Field name="country" autoComplete="country" className="form-control rounded-0" />
                            {errors.country && touched.country ? <div>{errors.country}</div> : null}

                            <label htmlFor="description">description</label>
                            <Field
                                type="text"
                                name="description"
                                autoComplete="description"
                                className="form-control rounded-0"
                            />
                            {errors.description && touched.description ? <div>{errors.description}</div> : null}

                            <button type="submit">Submit</button>
                        </Form>
                    )}
                </Formik>
                {loading && <Loading modal />}
            </ContentContainer>
        </PageContainer>
    );
};

export default CreateCommunity;
