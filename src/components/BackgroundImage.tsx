import styled from 'styled-components';
import React, { useCallback } from 'react';
import Loading from './Loading';

type BackgroundImageProps = {
    src: string;
    onLoadFinish?: () => void;
};

const BackgroundImage = ({ src, onLoadFinish }: BackgroundImageProps): JSX.Element => {
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        if (onLoadFinish && loaded) {
            onLoadFinish();
        }
    }, [loaded]);

    const onLoad = useCallback(() => {
        console.log('loaded FROM USECALLBACK');
        setTimeout(() => {
            setLoaded(true);
        }, 1000);
    }, []);

    console.log(loaded);
    return (
        //
        <>
            <BackgroundContainer>
                <img
                    style={{
                        zIndex: -100,
                        backgroundSize: 'cover',

                        display: loaded ? 'block' : 'none',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                    src={src}
                    onLoad={onLoad}
                />
            </BackgroundContainer>
            {!loaded && <Loading />}
        </>
    );
};

export default BackgroundImage;

const BackgroundContainer = styled.div`
    position: fixed;
    overflow-y: hidden;
    overflow-x: hidden;
    z-index: -80;
    top: 0;
    height: 100%;
    width: 100%;
`;
