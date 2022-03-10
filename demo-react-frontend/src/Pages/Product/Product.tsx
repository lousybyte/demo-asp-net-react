import React from 'react';
import { ProductData, removeProduct } from './ProductData';
import { useDispatch } from 'react-redux';
import {
  removingProductAction,
  removedProductAction,
} from '../../Store';

interface Props {
  data: ProductData;
  showContent?: boolean;
}

export const Product = ({ data, showContent = true}: Props) => {
  const dispatch = useDispatch();

  const handleRemoveProductClick = (productId: number) => {
    const doRemoveProduct = async (productId: number) => {
      dispatch(removingProductAction());
      await removeProduct(productId);
      dispatch(removedProductAction(productId));
    };
    if (productId) {
      doRemoveProduct(productId);
    }
  };

  return (
    <React.Fragment>
      <td className="align-middle text-center text-sm">
        <span className="text-xs text-secondary mb-0 font-weight-bold">{data.id}</span>
      </td>
      <td className="align-middle text-center text-sm">
        <span className=" text-xs text-primary mb-0 font-weight-bold">{data.product_name}</span>
      </td>
      <td className="align-middle text-center text-sm">
        <span className="text-xs text-secondary mb-0">{data.brand_name}</span>
      </td>
      <td className="align-middle text-center text-sm">
        <span className="text-xs text-secondary mb-0">{data.category_name}</span>
      </td>
      <td className="align-middle text-center text-sm">
        <span className="text-xs text-warning mb-0">{data.list_price} $</span>
      </td>
      <td className="align-middle text-center text-sm">
        <input type="button" className="btn btn-sm btn-danger product-id m-0" value="Delete" onClick={() => handleRemoveProductClick(data.id)} />
      </td>
    </React.Fragment>
  );
};
