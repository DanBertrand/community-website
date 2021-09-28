import React from 'react';
import { JobType } from '../../../../../hooks/useFetch';

type JobLineProps = JobType & { handleDelete: (id: number) => void };

const JobLine: React.FC<JobLineProps> = ({
    id,
    title,
    description,
    handleDelete,
    duration_in_days,
    nbr_of_person_required,
}: JobLineProps): JSX.Element => {
    return (
        <div>
            <p>{title}</p>
            <span>Duration: {duration_in_days}</span>
            <span>Number of person requierd: {nbr_of_person_required}</span>
            <span>{description}</span>
            <input type="button" onClick={() => handleDelete(id)} value="X" />
        </div>
    );
};

export default JobLine;
