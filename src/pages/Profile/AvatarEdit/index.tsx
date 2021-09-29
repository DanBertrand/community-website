import React from 'react';

type AvatarEditProps = {
    avatar?: string;
    handleChange: (e: React.SyntheticEvent) => void;
    handleDelete: () => void;
};

const AvatarEdit: React.FC<AvatarEditProps> = ({ handleChange, avatar, handleDelete }: AvatarEditProps) => {
    return (
        <div>
            <label>Profile Picture</label>
            <img
                alt="Profile Picture"
                style={{
                    borderRadius: '15px',
                    border: 'solid black',
                    width: '200px',
                    height: '200px',
                }}
                src={avatar ? avatar : ''}
            />

            <input
                name="avatar"
                type="file"
                // value={!previewFile && ''}
                onChange={handleChange}
            />
            <button type="button" onClick={handleDelete}>
                X
            </button>
        </div>
    );
};

export default AvatarEdit;
