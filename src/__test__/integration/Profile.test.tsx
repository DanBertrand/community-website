import React from 'react';
import ReactDOM from 'react-dom';
import Profile from 'pages/Profile';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <Profile
            component={Profile}
            path={'/profile'}
            restricted={false}
            user={{
                first_name: 'Dan',
                last_name: 'Bertrand',
                has_communities: false,
                jobs: [],
                email: 'dan.bertrand.hs@gmail.com',
                id: 1,
                confirmation_token: '01dfsfwc1wcbv5dsqq5',
                confirmed_at: '25/12/2022',
                confirmation_sent_at: '25/12/2021',
                workshops: [],
                avatar: {
                    id: 1,
                    url: '../../assets/images/main-image.jpg',
                    public_id: '00__dsd--655sdfwcsd',
                },
            }}
        />,
        div,
    );
});
