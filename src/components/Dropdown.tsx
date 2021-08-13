import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { CommunityType } from '../redux/types';
import { Link, useHistory } from 'react-router-dom';

type DropdownProps = {
    children: string;
    communitiesCreator?: CommunityType[] | undefined;
    communitiesMember?: CommunityType[] | undefined;
};

const Dropdown: React.FC<DropdownProps> = ({ children, communitiesCreator, communitiesMember }: DropdownProps) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useHistory();
    // const anchor = React.useRef();

    // const generateCommunitiesLinks = () => {
    //     communitiesCreator?.map((community) => (
    //         <MenuItem key={community.id} onClick={handleClose}>
    //             {community.name}
    //         </MenuItem>
    //     ));
    // };

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSelect = (e: any) => {
        console.log(history);
        console.log(e.target.value);
    };

    console.log('communitiesCreator', communitiesCreator);
    console.log('communitiesMember', communitiesMember);

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                {children}
            </Button>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted onClick={handleSelect} open={Boolean(anchorEl)}>
                {communitiesCreator?.map((community) => (
                    <MenuItem value={community.id} onClick={handleSelect} key={community.id}>
                        {community.name}
                    </MenuItem>
                ))}
                {communitiesMember?.map((community) => (
                    <MenuItem key={community.id}>
                        <Link to={`/community/${community.id}`}>{community.name}</Link>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default Dropdown;
