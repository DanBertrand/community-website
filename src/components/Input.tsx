import React from 'react';
import styled from 'styled-components';

type InputProps = {
    label?: string;
    value: string;
    name: string;
    rules?: {
        max?: number;
        min?: number;
    };
    onChange: (e: any) => void;
};

const Input: React.FC<InputProps> = ({ label, value, onChange, name, rules }: InputProps) => {
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleError = () => {
        const error = [''];
        if (rules) {
            if (rules.max && value.length > rules.max) {
                error.push(`Too many caracters. ${rules.max} maximum allowed`);
            }
            if (rules.min && value.length < rules.min) {
                error.push(`Not enough caracters. ${rules.min} minimum required`);
            }
        }
        return error.join('. ').slice(2);
    };

    React.useEffect(() => {
        setErrorMessage(handleError());
    }, [value]);

    return (
        <InputContainer>
            {label && <label>{label}</label>}
            <StyledInput
                error={errorMessage ? true : false}
                name={name}
                value={value}
                type="text"
                onChange={onChange}
            />
            {errorMessage && <span>{errorMessage}</span>}
        </InputContainer>
    );
};

export default Input;

type StyledInputProps = {
    error?: boolean;
};

const StyledInput = styled.input<StyledInputProps>`
    background-color: ${({ error }) => (error ? 'red' : null)};
    min-width: 300px;
`;

const InputContainer = styled.div`
    padding: 5px 5px 5px 5px;
    display: flex;
    flex-direction: column;
`;
