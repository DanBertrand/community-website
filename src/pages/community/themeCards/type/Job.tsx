import React from 'react';
import { CommunityType } from '../../../../redux/types';
import useFetch, { JobType } from '../../../../hooks/useFetch';

type JobProps = {
    community: CommunityType;
    editingMode: boolean;
};

const Job: React.FC<JobProps> = ({ community }: JobProps) => {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [duration, setDuration] = React.useState<number>(0);
    const [nbrOfPerson, setNbrOfPerson] = React.useState<number>(0);
    const [reload, setReload] = React.useState(0);
    const { post, get, data: jobs, remove } = useFetch();
    const [create, setCreate] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();

        await post(`/communities/${community.id}/jobs`, {
            job: { title, description, nbr_of_person_required: nbrOfPerson, duration_in_days: duration },
        });
        setReload((prevReload) => prevReload + 1);
    };

    const handleDelete = async (id: number) => {
        await remove(`/communities/${community.id}/jobs/${id}`);
        setReload((prevReload) => prevReload + 1);
    };

    const handleApply = async (id: number) => {
        await post(`/communities/${community.id}/workshops`, { workshop: { title, description } });
        setReload((prevReload) => prevReload + 1);
        console.log(id);
        setCreate(false);
    };

    React.useEffect(() => {
        get(`/communities/${community.id}/jobs`);
    }, [reload]);

    console.log('jobs', jobs);
    console.log('reload', reload);

    return (
        <>
            <input type="button" onClick={() => setCreate(true)} value="+" />{' '}
            {create && (
                <form id="createJob" onSubmit={handleSubmit}>
                    <label htmlFor="title">
                        Title
                        <input value={title} onChange={(e) => setTitle(e.target.value)} name="title" type="text" />
                    </label>
                    <label htmlFor="title">
                        Duration in days
                        <input
                            value={duration}
                            onChange={(e) => setDuration(parseInt(e.target.value))}
                            name="duration"
                            type="number"
                        />
                    </label>
                    <label htmlFor="title">
                        Number of person needed
                        <input
                            value={nbrOfPerson}
                            onChange={(e) => setNbrOfPerson(parseInt(e.target.value))}
                            name="nbrOfPerson"
                            type="number"
                        />
                    </label>
                    <label htmlFor="description">
                        Description
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            name="description"
                            form="createJob"
                        />
                    </label>
                    <button type="submit">Create</button>
                </form>
            )}
            {jobs &&
                jobs.map((j: JobType) => (
                    <div key={j.id}>
                        <p key={j.id}>{j.title}</p>
                        <span>Duration: {j.duration_in_days}</span>
                        <span>Number of person requierd: {j.nbr_of_person_required}</span>
                        <input type="button" onClick={() => handleDelete(j.id)} value="X" />{' '}
                        <input type="button" onClick={() => handleApply(j.id)} value="Apply" />{' '}
                    </div>
                ))}
        </>
    );
};

export default Job;
