import React from 'react';

type AvatarProps = {
    src?: string;
    borderRadius?: string;
    size: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, borderRadius, size }: AvatarProps) => {
    return (
        <img
            alt="Profile Picture"
            style={{
                borderRadius: borderRadius,
                border: 'solid black',
                width: size,
                height: size,
            }}
            src={src}
        />
    );
};

export default Avatar;
