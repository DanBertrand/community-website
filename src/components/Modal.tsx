import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { ModalWrapper } from '../styles/index';

type ModalProps = {
    children: ReactElement | ReactElement[];
    onClickOut: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, onClickOut }: ModalProps) => {
    const ref = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        const checkIfClickedOutside: EventListenerOrEventListenerObject = (e: any) => {
            const target = e.target as HTMLInputElement;
            if (ref && ref.current && !ref.current?.contains(target)) {
                onClickOut();
            }
        };
        document.addEventListener('mousedown', checkIfClickedOutside);
        return () => {
            document.removeEventListener('mousedown', checkIfClickedOutside);
        };
    }, []);
    return (
        <ModalWrapper>
            <StyledModal ref={ref}>
                <button style={{ color: 'black' }} onClick={onClickOut}>
                    X
                </button>
                {children}
            </StyledModal>
        </ModalWrapper>
    );
};

export default Modal;

const StyledModal = styled.div`
    position: absolute;
    background: rgba(179, 174, 109, 1);
    height: 25%;
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 150px;
`;
