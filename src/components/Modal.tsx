import React, { ReactElement } from 'react';
import styled from 'styled-components';

type ModalProps = {
    children: ReactElement | ReactElement[] | any;
    warning?: string;
    onClickOut?: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, onClickOut, warning }: ModalProps) => {
    const ref = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        const checkIfClickedOutside: EventListenerOrEventListenerObject = (e: any) => {
            const target = e.target as HTMLInputElement;
            if (onClickOut && ref.current && !ref.current?.contains(target)) {
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
                {onClickOut && (
                    <button style={{ color: 'black' }} onClick={onClickOut}>
                        X
                    </button>
                )}
                <p style={{ flexGrow: 1, verticalAlign: 'middle' }}>{warning}</p>
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

const ModalWrapper = styled.div`
    position: fixed;

    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    /* width: 100vw;
    height: 100vh; */
    /* position: fixed; */

    background: rgba(0, 0, 0, 0.6);
    /* top: 0;
    left: 0;
    bottom: 0;
    right: 0; */
    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 5;
`;
