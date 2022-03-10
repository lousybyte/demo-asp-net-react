import React from 'react';
import { ProductData} from './ProductData';
import { Product } from './Product';

interface Props {
  data: ProductData[];
  renderItem?: (item: ProductData) => JSX.Element;
}

export const ProductList = ({data, renderItem}: Props) => {
  return <React.Fragment>
    {data.map((product) => (
      <tr key={product.id}>
        {renderItem ? renderItem(product) : <Product data={product} />}
      </tr>
    ))}
  </React.Fragment>;
};
