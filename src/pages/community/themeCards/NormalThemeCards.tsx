import React from 'react';
import styled from 'styled-components';
import { GrMapLocation } from 'react-icons/gr';
import { FaCarrot } from 'react-icons/fa';
import { RiTeamLine } from 'react-icons/ri';
import { GiCrosscutSaw } from 'react-icons/gi';
import { GiStrong } from 'react-icons/gi';
import EditIcon from '../../../components/EditIcon';

type NormalThemeCardProps = {
    title: string;
    canEdit: boolean;
    selectedThemeCard: string;
    handleSelect: (title: string, editing: boolean) => void;
    editingMode: boolean;
};

const NormalThemeCard: React.FC<NormalThemeCardProps> = ({
    title,
    handleSelect,
    canEdit,
    selectedThemeCard,
    editingMode,
}: NormalThemeCardProps) => {
    const standardIconSize = 56;

    const icon = {
        location: <GrMapLocation size={standardIconSize} />,
        product: <FaCarrot size={standardIconSize} />,
        project: <FaCarrot size={standardIconSize} />,
        team: <RiTeamLine size={standardIconSize} />,
        workshop: <GiCrosscutSaw size={standardIconSize} />,
        job: <GiStrong size={standardIconSize} />,
    };

    const isSelected = title === selectedThemeCard;

    return (
        <StyledNormalThemeCard
            onClick={(e: React.SyntheticEvent) => {
                e.stopPropagation();
                handleSelect(title, false);
            }}
            isSelected={isSelected}
        >
            {canEdit && (
                <EditIcon
                    active={isSelected && editingMode}
                    onClick={() => handleSelect(title, true)}
                    marginTop={5}
                    marginRight={5}
                />
            )}
            <Content>
                <h3>{title}</h3>
                {(() => {
                    switch (title) {
                        case 'Location':
                            return icon.location;
                        case 'Product':
                            return icon.product;
                        case 'Project':
                            return icon.project;
                        case 'Team':
                            return icon.team;
                        case 'Job':
                            return icon.job;
                        case 'Workshop':
                            return icon.workshop;
                    }
                })()}
            </Content>
        </StyledNormalThemeCard>
    );
};

export default NormalThemeCard;

type StyledNormalThemeCardProps = {
    isSelected: boolean;
};

const StyledNormalThemeCard = styled.div<StyledNormalThemeCardProps>`
    display: flex;
    flex-direction: column;
    box-shadow: 3px 3px;
    /* background-color: #b38b6d; */
    background-color: ${({ isSelected }) => (isSelected ? '#b36d72' : '#b38b6d')};
    transform: ${({ isSelected }) => (isSelected ? 'scale(1.1)' : null)};
    border-radius: 10px;
    margin: 30px 30px 30px 30px;
    min-height: 200px;
    min-width: 200px;
    max-width: 400px;
    flex-grow: 1;
    &:hover {
        background-color: #b36d72;
        cursor: pointer;
        transform: scale(1.1);
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    flex-grow: 1;
`;
