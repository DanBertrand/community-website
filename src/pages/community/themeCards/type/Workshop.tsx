import React from 'react';
import { CommunityType } from '../../../../redux/types';
import styled from 'styled-components';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import useFetch, { WorkshopType } from '../../../../hooks/useFetch';

type WorkshopProps = {
    community: CommunityType;
    editingMode: boolean;
};

const Workshop: React.FC<WorkshopProps> = ({ community }: WorkshopProps) => {
    const { user } = useTypedSelector((state) => state.authentication);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [create, setCreate] = React.useState(false);
    const [reload, setReload] = React.useState(0);
    const { get, state, post, patch, remove } = useFetch<WorkshopType[]>();
    const { data: workshops } = state;

    const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        await post(`/communities/${community.id}/workshops`, { workshop: { title, description } });
        setReload((prevReload) => prevReload + 1);
        setCreate(false);
    };

    const handleApply = async (id: number) => {
        if (user) {
            await patch(`/communities/${community.id}/workshops/${id}`, { workshop: { user_id: user.id } });
            setReload((prevReload) => prevReload + 1);
            console.log(id);
            setCreate(false);
        }
    };

    const handleDelete = async (id: number) => {
        await remove(`/communities/${community.id}/workshops/${id}`);
        setReload((prevReload) => prevReload + 1);
    };

    React.useEffect(() => {
        get(`/communities/${community.id}/workshops`);
    }, [reload]);

    console.log('workshops', workshops);
    console.log('reload', reload);

    return (
        <>
            <input type="button" onClick={() => setCreate(true)} value="+" />{' '}
            {create && (
                <form id="createWorkshop" onSubmit={handleSubmit}>
                    <label htmlFor="title">
                        Title
                        <input value={title} onChange={(e) => setTitle(e.target.value)} name="title" type="text" />
                    </label>
                    <label htmlFor="description">
                        Description
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            name="description"
                            form="createWorkshop"
                        />
                    </label>
                    <button type="submit">Create</button>
                </form>
            )}
            {workshops &&
                workshops.map((w: WorkshopType) => (
                    <WorkshopLine key={w.id}>
                        <p key={w.id}>{w.title}</p>
                        <input type="button" onClick={() => handleDelete(w.id)} value="X" />{' '}
                        <input type="button" onClick={() => handleApply(w.id)} value="Apply" />{' '}
                    </WorkshopLine>
                ))}
        </>
    );
};

export default Workshop;

const WorkshopLine = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    justify-content: space-around;
`;
