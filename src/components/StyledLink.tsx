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
    color: #f8c471;
    padding: 0 0 0 0;
    &:hover {
        color: #7f6ca4;
    }
`;
