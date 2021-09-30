import React from 'react';
import CommunityList from './CommunityList';
import backgroundImage from 'assets/images/main-image.jpg';

const Home: React.VoidFunctionComponent = (): JSX.Element => {
    return (
        <>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '60% 40%',
                    gridGap: '1%',
                    marginTop: '2%',

                    paddingLeft: '2%',
                    paddingRight: '2%',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <CommunityList />
                </div>
                <div
                    style={{
                        position: 'sticky',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        maxHeight: '80vh',
                    }}
                >
                    <img
                        style={{
                            borderRadius: '150px',
                            maxWidth: '100%',
                            maxHeight: '100%',
                            boxShadow: '12px 12px 2px 1px rgba(66,73,73)',
                        }}
                        src={backgroundImage}
                    />
                </div>
            </div>
        </>
    );
};

export default Home;
