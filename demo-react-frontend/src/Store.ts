import { Store, createStore, combineReducers } from 'redux';
import { ProductData, MultipleData } from './Pages/Product/ProductData';

interface ProductsState {
  readonly loading: boolean;
  readonly all: MultipleData;
  readonly viewing: ProductData | null;
  readonly filtered: ProductData[];
}

export interface AppState {
  readonly products: ProductsState;
}

const initialProductsState: ProductsState = {
  loading: false,
  all: { products: [], brands: [], categories: [] },
  viewing: null,
  filtered: [],
};

export const GETTINGPRODUCTS = 'GettingProducts';

export const gettingProductsAction = () =>
  ({
    type: GETTINGPRODUCTS
  } as const);

export const GOTPRODUCTS = 'GotProducts';
export const gotProductsAction = (products: MultipleData) =>
  ({
    type: GOTPRODUCTS,
    products: products
  } as const);

export const GETTINGPRODUCT = 'GettingProduct';
export const gettingProductAction = () =>
  ({
    type: GETTINGPRODUCT
  } as const);

export const GOTPRODUCT = 'GotProduct';
export const gotProductAction = (product: ProductData | null) =>
  ({
    type: GOTPRODUCT,
    product: product
  } as const);

export const SEARCHINGPRODUCTS = 'SearchingProducts';
export const searchingProductsAction = () =>
  ({
    type: SEARCHINGPRODUCTS
  } as const);

export const SEARCHEDPRODUCTS = 'SearchedProducts';
export const searchedProductsAction = (products: ProductData[]) =>
  ({
    type: SEARCHEDPRODUCTS,
    products,
  } as const);

export const REMOVINGPRODUCT = 'RemovingProduct';
export const removingProductAction = () =>
  ({
    type: REMOVINGPRODUCT
  } as const);

export const REMOVEDPRODUCT = 'RemovedProduct';
export const removedProductAction = (productId: number) =>
  ({
    type: REMOVEDPRODUCT,
    productId: productId
  } as const);

export const ADDINGPRODUCT = 'AddingProduct';
export const addingProductAction = () =>
  ({
    type: ADDINGPRODUCT
  } as const);

export const ADDEDPRODUCT = 'AddedProduct';
export const addedProductAction = (product: ProductData) =>
  ({
    type: ADDEDPRODUCT,
    product: product
  } as const);

type ProductsActions =
  | ReturnType<typeof gettingProductsAction>
  | ReturnType<typeof gotProductsAction>
  | ReturnType<typeof gettingProductAction>
  | ReturnType<typeof gotProductAction>
  | ReturnType<typeof searchingProductsAction>
  | ReturnType<typeof searchedProductsAction>
  | ReturnType<typeof removingProductAction>
  | ReturnType<typeof removedProductAction>
  | ReturnType<typeof addingProductAction>
  | ReturnType<typeof addedProductAction>;

const productsReducer = (state = initialProductsState, action: ProductsActions) => {
  switch (action.type) {
    case GETTINGPRODUCTS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GOTPRODUCTS: {
      return {
        ...state,
        all: action.products,
        loading: false,
      };
    }
    case GETTINGPRODUCT: {
      return {
        ...state,
        viewing: null,
        loading: true,
      };
    }
    case GOTPRODUCT: {
      return {
        ...state,
        viewing: action.product,
        loading: false,
      };
    }
    case SEARCHINGPRODUCTS: {
      return {
        ...state,
        searched: [],
        loading: true,
      };
    }
    case SEARCHEDPRODUCTS: {
      return {
        ...state,
        searched: action.products,
        loading: false,
      };
    }
    case REMOVINGPRODUCT: {
      return {
        ...state,
        loading: true,
      };
    }
    case REMOVEDPRODUCT: {
      return {
        ...state,
        all: {...state.all, products: state.all.products.filter(product => product.id !== action.productId)},
        loading: false,
      };
    }
    case ADDINGPRODUCT: {
      return {
        ...state,
        loading: true,
      };
    }
    case ADDEDPRODUCT: {
      return {
        ...state,
        all: {...state.all, products: [...state.all.products, action.product]},
        loading: false,
      };
    }
  }
  return state;
};

const rootReducer = combineReducers<AppState>({ products: productsReducer});

export function configureStore(): Store<AppState> {
  const store = createStore(rootReducer, undefined);
  return store;
}
