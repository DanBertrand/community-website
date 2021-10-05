/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

type DropdownProps = {
    handleSelect: (id: string) => void;
    children: React.ReactNode | React.ReactNode[];
};

export const Dropdown: React.FC<DropdownProps> = ({ handleSelect, children }: DropdownProps) => {
    const handleChange = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        const newValue = target.value;
        handleSelect(newValue);
    };

    return (
        <DropdownWrapper>
            <StyledSelect onClick={handleChange}>{children}</StyledSelect>
        </DropdownWrapper>
    );
};

type OptionProps = {
    value: number;
    label: string;
    currentPathID: number;
};

export const Option: React.FC<OptionProps> = ({ value, label, currentPathID }: OptionProps) => {
    return currentPathID === value ? (
        <StyledOption defaultValue={value} value={value}>
            {label}
        </StyledOption>
    ) : (
        <StyledOption value={value}>{label}</StyledOption>
    );
};

export const DropdownWrapper = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
`;

export const StyledSelect = styled.div`
    height: 100%;
    padding: 0.5rem;
`;

export const StyledOption = styled.option`
    color: ${(props) => (props.selected ? 'lightgrey' : 'black')};
`;
