import React from 'react';
import { CommunityType } from 'store/types';

type ProductProps = {
    community: CommunityType;
    editingMode: boolean;
    canEdit: boolean;
};

const Product = ({}: ProductProps): JSX.Element => {
    return <div></div>;
};

export default Product;
