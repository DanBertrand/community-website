import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFlash } from '../../stores/flashmessages/flashAction';
import { StoreStateType } from '../../stores';

const FlashMessage: React.FC = () => {
    const { content, category } = useSelector((state: StoreStateType) => state.flash);

    const dispatch = useDispatch();

    console.log('FLASH MESSAGE CONTENT ', content);

    return (
        <>
            <div className={`alert alert-${category} alert-dismissible fade show`} role="alert">
                {content}
                <button type="button" className="close" onClick={() => dispatch(removeFlash())}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </>
    );
};

export default FlashMessage;
