import React from 'react';
import { JobType } from '../../../../../hooks/useFetch';
// import { useTypedSelector } from '../../../../../hooks/useTypedSelector';

type JobLineProps = JobType & { handleDelete: (id: number) => void; handleApply: (id: number) => void };

const JobLine: React.FC<JobLineProps> = ({
    id,
    title,
    description,
    handleDelete,
    handleApply,
    // users,
    duration_in_days,
    nbr_of_person_required,
}: JobLineProps) => {
    // const { user } = useTypedSelector((state) => state.authentication);
    // const hasApplied = users.length > 0 && users.filter((u) => u.id === user?.id).length > 0;

    return (
        <div>
            <p>{title}</p>
            <span>Duration: {duration_in_days}</span>
            <span>Number of person requierd: {nbr_of_person_required}</span>
            <span>{description}</span>
            <input type="button" onClick={() => handleDelete(id)} value="X" />{' '}
            <input type="button" onClick={() => handleApply(id)} value="Apply" />
        </div>
    );
};

export default JobLine;
