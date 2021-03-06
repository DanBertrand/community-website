import React from 'react';
import { useFetch } from 'hooks';
import { CommunityType } from 'store/types';
import JobLine from './JobLine';
import { JobType } from 'hooks/useFetch';
import { useTranslation } from 'react-i18next';

type JobProps = {
    community: CommunityType;
    editingMode: boolean;
    canEdit: boolean;
};

const Job: React.FC<JobProps> = ({ community, canEdit }: JobProps) => {
    const { t } = useTranslation('navbar');
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [duration, setDuration] = React.useState<number>(0);
    const [nbrOfPerson, setNbrOfPerson] = React.useState<number>(0);
    const [reload, setReload] = React.useState(0);
    const { state, post, get, remove } = useFetch<JobType[]>();
    const { data: jobs } = state;
    const [create, setCreate] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        post(`/communities/${community.id}/jobs`, {
            job: { title, description, nbr_of_person_required: nbrOfPerson, duration_in_days: duration },
        });
        setReload((prevReload) => prevReload + 1);
        setCreate(false);
    };

    const handleDelete = async (id: number) => {
        await remove(`/communities/${community.id}/jobs/${id}`);
        setReload((prevReload) => prevReload + 1);
    };

    React.useEffect(() => {
        get(`/communities/${community.id}/jobs`);
    }, [reload]);

    return (
        <>
            {canEdit && <input type="button" onClick={() => setCreate(true)} value="+" />}
            {create && (
                <form id="createJob" onSubmit={handleSubmit}>
                    <label htmlFor="title">
                        {t('title')}
                        <input value={title} onChange={(e) => setTitle(e.target.value)} name="title" type="text" />
                    </label>
                    <label htmlFor="title">
                        {t('duration_in_days')}
                        <input
                            value={duration}
                            onChange={(e) => setDuration(parseInt(e.target.value))}
                            name="duration"
                            type="number"
                        />
                    </label>
                    <label htmlFor="title">
                        {t('number_of_persons')}
                        <input
                            value={nbrOfPerson}
                            onChange={(e) => setNbrOfPerson(parseInt(e.target.value))}
                            name="nbrOfPerson"
                            type="number"
                        />
                    </label>
                    <label htmlFor="description">
                        {t('description')}
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            name="description"
                            form="createJob"
                        />
                    </label>
                    <button type="submit"> {t('create')}</button>
                </form>
            )}
            {jobs && (
                <ul>
                    {jobs.map((job: JobType) => (
                        <li key={job.id}>
                            <JobLine
                                key={job.id}
                                id={job.id}
                                users={job.users}
                                title={job.title}
                                handleDelete={handleDelete}
                                description={job.description}
                                duration_in_days={job.duration_in_days}
                                nbr_of_person_required={job.nbr_of_person_required}
                                community_id={community.id}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default Job;
