import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type StyledLinkProps = {
    to: string;
    children: string;
    onClick?: () => void;
};

const StyledLink: React.FC<StyledLinkProps> = ({ to, children, onClick }: StyledLinkProps) => {
    return (
        <Link style={{ textDecoration: 'none' }} to={to}>
            <Styled onClick={onClick}>{children}</Styled>
        </Link>
    );
};

export default StyledLink;

const Styled = styled.p`
    color: #b38b6d;
    font-size: 32px;
    &:hover {
        color: #b36d72;
    }
`;
