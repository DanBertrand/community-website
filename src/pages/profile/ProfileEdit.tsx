import React from 'react';
import { ContentContainer, Button, Column } from '../../styles/index';
import Input from '../../components/Input';
import { UserType } from '../../redux/types';
import Modal from '../../components/Modal';
import * as _ from 'lodash';
import { useActions } from '../../hooks/useActions';
import useFetch from '../../hooks/useFetch';
import AvatarEdit from './AvatarEdit';
import Loading from '../../components/Loading';

type ProfileEditProps = {
    user: UserType;
};

const ProfileEdit: React.FC<ProfileEditProps> = ({ user }: ProfileEditProps) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [madeChange, setMadeChange] = React.useState(false);
    const [previewFile, setPreviewFile] = React.useState('');
    const [file, setFile] = React.useState<File>();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const { loadUser } = useActions();
    const { put, submitAvatar, remove } = useFetch();

    const originalInput = {
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        password: '',
        newPassword: '',
        newPasswordConfirmation: '',
        avatar: user.avatar?.url,
    };
    const [input, setInput] = React.useState(originalInput);

    const handleChange = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        const { name, value } = target;
        const files = target.files;
        if (name === 'avatar' && files) {
            console.log('File ', files[0]);
            setFile(files[0]);
            setPreviewFile(URL.createObjectURL(files[0]));
        } else {
            setInput((prevInput) => ({
                ...prevInput,
                [name]: value,
            }));
        }
    };

    const handleDelete = async () => {
        if (previewFile) {
            setPreviewFile('');
        } else if (user.avatar?.url) {
            setIsLoading(true);
            await remove(`/user/avatars/${user.avatar.id}`, { url: user.avatar.url }, loadUser);
        }
    };

    const updateProfile = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input.password.length > 5) {
            setIsLoading(true);
            if (file) {
                const formData = new FormData();
                formData.append('image', file);
                formData.append('password', input.password);
                await submitAvatar(formData);
            }
            const body = {
                account_update: {
                    first_name: input.firstName,
                    last_name: input.lastName,
                    password: input.password,
                    new_password: input.newPassword,
                    new_password_confirmation: input.newPasswordConfirmation,
                },
            };
            await put(`/signup`, body, loadUser);
        }
    };

    React.useEffect(() => {
        if (_.isEqual(originalInput, input) && previewFile === '') {
            setMadeChange(false);
        } else {
            setMadeChange(true);
        }
    }, [input, originalInput, previewFile]);

    return (
        <>
            {isLoading && <Loading modal={true} />}
            {isModalOpen && (
                <Modal onClickOut={() => setIsModalOpen(false)}>
                    <form onSubmit={updateProfile}>
                        <Input
                            name="password"
                            label={'Password'}
                            value={input.password}
                            rules={{ min: 6, max: 10 }}
                            onChange={handleChange}
                        />
                        <Button
                            active={input.password.length > 5 && input.password.length < 10 ? true : false}
                            type="submit"
                        >
                            Send
                        </Button>
                    </form>
                </Modal>
            )}
            <form>
                <ContentContainer direction={'row'}>
                    <Column>
                        <Input name="firstName" label={'First Name'} value={input.firstName} onChange={handleChange} />
                        <Input name="lastName" label={'Last Name'} value={input.lastName} onChange={handleChange} />
                        <Input
                            name="newPassword"
                            label={'New password'}
                            value={input.newPassword}
                            onChange={handleChange}
                        />
                        <Input
                            name="newPasswordConfirmation"
                            label={'New Password Confirmation'}
                            value={input.newPasswordConfirmation}
                            onChange={handleChange}
                        />
                    </Column>
                    <Column>
                        <AvatarEdit
                            avatar={previewFile ? previewFile : user.avatar?.url}
                            handleChange={handleChange}
                            handleDelete={handleDelete}
                        />
                    </Column>
                </ContentContainer>
                <ContentContainer direction={'row'}>
                    <Button
                        active={madeChange}
                        type="button"
                        onClick={() => {
                            madeChange && setIsModalOpen(true);
                        }}
                    >
                        Update Profile
                    </Button>
                </ContentContainer>
            </form>
        </>
    );
};

export default ProfileEdit;
