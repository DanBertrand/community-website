import React from 'react';
import { useSelector } from 'react-redux';
// import styled from 'styled-components';
// import mainImage from './assets/images/main-image.jpg';
// import Login from './pages/authentications/Login';
import Register from './pages/authentications/Register';

interface StoreState {
    auth: {
        currentUser: string;
        token: string;
    };
}

const App: React.FC = () => {
    const state = useSelector((state: StoreState) => state.auth);

    console.log('Store', state);

    return <Register />;
};

// const Container = styled.div`
//     background: url(${mainImage});
//     width: 100%;
//     height: 100%;
// `;

export default App;
