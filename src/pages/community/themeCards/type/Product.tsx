import React from 'react';
import { CommunityType } from '../../../../redux/types';

type ProductProps = {
    community: CommunityType;
};

const Product: React.FC<ProductProps> = () => {
    return <div>Product</div>;
};

export default Product;
