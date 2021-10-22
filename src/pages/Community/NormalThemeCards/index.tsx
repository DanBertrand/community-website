import React from 'react';
import styled from 'styled-components';
import { GrMapLocation } from 'react-icons/gr';
import { FaCarrot } from 'react-icons/fa';
import { RiTeamLine } from 'react-icons/ri';
import { GiCrosscutSaw } from 'react-icons/gi';
import { GiStrong } from 'react-icons/gi';
import EditIcon from 'components/EditIcon';
import { Card } from '..';
import { useTranslation } from 'react-i18next';

type NormalThemeCardProps = {
    title: string;
    id: number;
    canEdit: boolean;
    selectedThemeCard?: Card;
    handleSelect: (id: number, editing: boolean) => void;
    editingMode: boolean;
};

const NormalThemeCard = ({
    title,
    id,
    handleSelect,
    canEdit,
    selectedThemeCard,
    editingMode,
}: NormalThemeCardProps): JSX.Element => {
    const { t } = useTranslation('community');
    const standardIconSize = 56;

    const icon = {
        location: <GrMapLocation size={standardIconSize} />,
        product: <FaCarrot size={standardIconSize} />,
        project: <FaCarrot size={standardIconSize} />,
        team: <RiTeamLine size={standardIconSize} />,
        workshop: <GiCrosscutSaw size={standardIconSize} />,
        job: <GiStrong size={standardIconSize} />,
    };

    const isSelected = id === selectedThemeCard?.id;

    console.log('ID CARD ', id);
    console.log('TITLE CARD ', title);

    return (
        <>
            <StyledNormalThemeCard
                onClick={(e: React.SyntheticEvent) => {
                    e.stopPropagation();
                    handleSelect(id, false);
                }}
                isSelected={isSelected}
            >
                {canEdit && (
                    <EditIcon
                        active={isSelected && editingMode}
                        onClick={() => handleSelect(id, true)}
                        marginTop={5}
                        marginRight={5}
                    />
                )}
                <Content>
                    <h3>{t(title)}</h3>
                    {(() => {
                        switch (id) {
                            case 1:
                                return icon.location;
                            case 2:
                                return icon.team;
                            case 3:
                                return icon.workshop;
                            case 4:
                                return icon.job;
                            case 5:
                                return icon.product;
                            case 6:
                                return icon.project;
                        }
                    })()}
                </Content>
            </StyledNormalThemeCard>
        </>
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
    background-color: ${({ isSelected }) => (isSelected ? '#7f6ca4' : '#F8C471 ')};
    transform: ${({ isSelected }) => (isSelected ? 'scale(1.1)' : null)};
    border-radius: 10px;
    margin: 30px 30px 30px 30px;
    min-height: 200px;
    min-width: 200px;
    max-width: 400px;
    flex-grow: 1;
    transition: all 0.2s ease-in;
    &:hover {
        background-color: #7f6ca4;
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
