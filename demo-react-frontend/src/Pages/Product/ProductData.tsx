import { http } from '../../http';
import { getAccessToken } from '../../Auth/Auth';

export interface MultipleData {
  products: ProductData[];
  brands: BrandDataFromServer[];
  categories: CategoryDataFromServer[];
}

export interface ProductData {
  id: number;
  product_name: string;
  brand_id: number;
  brand_name: string;
  category_id: number;
  category_name: string;
  list_price: number;
}

export interface ProductDataFromServer {
  id: number;
  productName: string;
  brandId: number;
  brandName: string;
  categoryId: number;
  categoryName: string;
  listPrice: number;
}

export interface BrandDataFromServer {
  id: number;
  name: string;
}

export interface CategoryDataFromServer {
  id: number;
  name: string;
}

export const mapProductFromServer = (product: ProductDataFromServer): ProductData => ({
  id: product.id,
  product_name: product.productName,
  brand_id: product.brandId,
  brand_name: product.brandName,
  category_id: product.categoryId,
  category_name: product.categoryName,
  list_price: product.listPrice
});

export interface MultipleDataFromServer {
  products: ProductDataFromServer[];
  brands: BrandDataFromServer[];
  categories: CategoryDataFromServer[];
}

export const getProducts = async (): Promise<MultipleData> => {
  const accessToken = await getAccessToken();

  const result = await http<MultipleDataFromServer>({ path: '/products', method: 'GET', accessToken});

  if (result.ok && result.body) {
    return {
      products: result.body.products.map(mapProductFromServer),
      brands: result.body.brands,
      categories:result.body.categories } as MultipleData;
  } else {
    return {} as MultipleData;
  }
};

export const getProduct = async (id: number): Promise<ProductData | null> => {
  const accessToken = await getAccessToken();

  const result = await http<ProductDataFromServer>({path: `/products/${id}`, method: 'GET', accessToken});

  if (result.ok && result.body) {
    return mapProductFromServer(result.body);
  } else {
    return null;
  }
};

export const searchProducts = async (productName: string): Promise<ProductData[]> => {
  const accessToken = await getAccessToken();

  const result = await http<ProductDataFromServer[]>(
    { path: `/products?search=${productName}`,
      method: 'GET',
      accessToken
    }
  );

  if (result.ok && result.body) {
    return result.body.map(mapProductFromServer);
  } else {
    return [];
  }
};

export interface PostProductData {
  productName: string;
  brandId: number;
  categoryId: number;
  listPrice:number;
}

export const postProduct = async (product: PostProductData): Promise<ProductData | null> => {
  const accessToken = await getAccessToken();

  const result = await http<void>(
    { path: `/products`,
      method: 'POST',
      body: JSON.stringify(product),
      accessToken
    });

  if (result.ok && result.body) {
    return mapProductFromServer(result.body);
  } else {
    return null;
  }
};

export const removeProduct = async (productId: number): Promise<void> => {
  const accessToken = await getAccessToken();

  await http<void>({path: `/products/${productId}`, method: 'DELETE', accessToken});
};
