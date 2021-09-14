import React from 'react';
import Loading from './Loading';

const { useCallback, useState } = React;

type ExternalImageProps = {
    src: string;
    alt: string;
};

const ExternalImage = ({ src, alt, ...props }: ExternalImageProps): JSX.Element => {
    const [loaded, setLoaded] = useState(false);
    const onLoad = useCallback(() => {
        console.log('loaded');
        setLoaded(true);
    }, []);

    return (
        <>
            <img onLoad={onLoad} src={src} alt={alt} {...props} />
            {!loaded && <Loading />}
        </>
    );
};

export default ExternalImage;
