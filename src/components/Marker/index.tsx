import React from 'react';
import { GoLocation } from 'react-icons/go';
import { MapProps } from 'components/Map';
import styled from 'styled-components';

type MarkerProps = MapProps & {
    text?: string;
};

const Marker: React.FC<MarkerProps> = ({ text }: MarkerProps) => {
    const [hover, setHover] = React.useState(false);
    const style = !hover ? { size: 28 } : { size: 42 };

    return (
        <StyledMarker size={style.size}>
            <GoLocation
                onMouseLeave={() => setHover(!hover)}
                onMouseEnter={() => setHover(!hover)}
                // onClick={handleClick}
                size={style.size}
                color={'red'}
            />
            {hover && <ModalInfos>{text}</ModalInfos>}
        </StyledMarker>
    );
};

export default Marker;

type StyledMarkerProps = {
    size: number;
};
export const StyledMarker = styled.div<StyledMarkerProps>`
    position: relative;
    bottom: ${({ size }) => `${size / 2}px`};
    right: ${({ size }) => `${size / 2}px`};
`;

export const ModalInfos = styled.div`
    position: relative;
    display: inline-block;
    padding: 5px 5px 5px 5px;
    z-index: 200;
    background-color: white;
    font-size: large;
`;
