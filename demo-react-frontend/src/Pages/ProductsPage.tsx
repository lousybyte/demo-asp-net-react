import React from 'react';
import { getProducts, postProduct } from './Product/ProductData';
import { Page } from './Page';
import { ProductList} from './Product/ProductsList';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import {
  AppState,
  gettingProductsAction,
  gotProductsAction,
  addingProductAction,
  addedProductAction
} from '../Store';
import { useForm } from 'react-hook-form';

type FormData = {
  productName: string;
  brandId: number;
  brandName?: string;
  categoryId: number;
  categoryName?: string;
  listPrice:number;
};

export const ProductsPage = () => {
  const dispatch = useDispatch();

  const all = useSelector(
    (state: AppState) => state.products.all
  );

  React.useEffect(() => {
    let cancelled = false;
    const doGetProducts = async () => {
      dispatch(gettingProductsAction());
      const foundProducts = await getProducts();
      if (!cancelled) {
        dispatch(gotProductsAction(foundProducts));
      }
    };
    doGetProducts();
    reset();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [
    successfullySubmitted,
    setSuccessfullySubmitted,
  ] = React.useState(false);

  const { register, formState: {errors}, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      brandId:1,
      categoryId: 1
    }
  });

  const submitForm = async (data: FormData) => {
    dispatch(addingProductAction());

    const result = await postProduct({
      productName: data.productName,
      brandId: data.brandId,
      categoryId: data.categoryId,
      listPrice: data.listPrice,
    });

    if (result) {
      dispatch(addedProductAction(result));
    }

    setSuccessfullySubmitted(result ? true : false);
  };

  return <Page>
    <div className="page-header align-items-start section-height-40 pt-5 pb-11 m-3 border-radius-lg" style={{backgroundImage: "url('/img/curved-images/curved6.png')"}}>
      <span className="mask bg-gradient-dark opacity-1"></span>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 text-center mx-auto">
            <h1 className="text-white mb-2 mt-5">Products</h1>
            <p className="text-lead text-white">Here you can do some CRUD operations</p>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row mt-lg-n10 mt-md-n11 mt-n10 mb-2">
        <div className="col-xl-10 col-lg-10 col-md-10 mx-auto">
          <div className="card z-index-0">
            <div className="card-header text-center pt-4">
              <span>Product List</span>
            </div>
            <div className="card-body pt-0 text-center">
              <div className="card">
                <div className="table-responsive">
                  <form onSubmit={handleSubmit(submitForm).bind(this)}>
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder">Id</th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder">Name</th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder">Brand</th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder">Category</th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder">Price</th>
                          <th className="text-secondary opacity-7"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <ProductList data={all.products}></ProductList>

                        <tr>
                          <td className="align-middle text-center text-sm">
                            {/* Id */}
                          </td>
                          <td className="align-middle text-center text-sm">
                            <div className="form-group">
                              <input className="form-control form-control-sm" aria-label="Product Name" placeholder="Product Name" id="ProductName" type="text"
                                {...register("productName", {
                                  required: true,
                                  minLength: 3,
                                  maxLength: 255
                                })} />
                            </div>
                          </td>
                          <td className="align-middle text-center text-sm">
                            <div className="form-group">
                              <select className="form-control form-control-sm" aria-label="Brand" id="Brand"
                                {...register("brandId", {
                                  required: true,
                                  max: 999
                                })}>
                                {all.brands.map((brand) => (
                                  <option key={brand.id} value={brand.id}>
                                    {brand.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </td>
                          <td className="align-middle text-center text-sm">
                            <div className="form-group">
                              <select className="form-control form-control-sm" aria-label="Category" placeholder="Category" id="Category"
                                {...register("categoryId", {
                                  required: true,
                                  max: 999
                                })}>
                                {all.categories.map((cat) => (
                                  <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </td>
                          <td className="align-middle text-center text-sm">
                            <div className="form-group">
                              <input className="form-control form-control-sm" aria-label="Price" placeholder="Price" id="Price"
                                {...register("listPrice", {
                                  required: true,
                                  min: 0,
                                  max: 999999
                                })} />
                            </div>
                          </td>
                          <td className="text-center text-sm">
                            <div className="form-group text-center">
                              <button type="submit" className="btn btn-sm bg-gradient-info w-100 mt-0 mb-0">Add</button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="mb-0">
                      {errors.productName && errors.productName.type === 'required' && (
                        <span className="text-danger text-sm">
                          The product name is required.
                        </span>
                      )}
                      {errors.productName && errors.productName.type === 'minLength' && (
                        <span className="text-danger text-sm">
                          The product name must have at least 3 characters.
                        </span>
                      )}
                      {errors.productName && errors.productName.type === 'maxLength' && (
                        <span className="text-danger text-sm">
                          The product name must have at most 255 characters.
                        </span>
                      )}
                    </p>
                    <p className="mb-0">
                      {errors.brandId && errors.brandId.type === 'required' && (
                        <span className="text-danger text-sm">
                          The brand is required.
                        </span>
                      )}
                      {errors.brandId && errors.brandId.type === 'max' && (
                        <span className="text-danger text-sm">
                          The brand value is incorrect.
                        </span>
                      )}
                    </p>
                    <p className="mb-0">
                      {errors.categoryId && errors.categoryId.type === 'required' && (
                        <span className="text-danger text-sm">
                          The category is required.
                        </span>
                      )}
                      {errors.categoryId && errors.categoryId.type === 'max' && (
                        <span className="text-danger text-sm">
                          The category value is incorrect.
                        </span>
                      )}
                    </p>
                    <p className="mb-4">
                      {errors.listPrice && errors.listPrice.type === 'required' && (
                        <span className="text-danger text-sm">
                          The price is required.
                        </span>
                      )}
                      {errors.listPrice && errors.listPrice.type === 'max' && (
                        <span className="text-danger text-sm">
                          The price value is incorrect.
                        </span>
                      )}
                    </p>
                    <div className="row p-0 m-0">
                      <div className="col-2"></div>
                      <div className="col-8">
                        {successfullySubmitted && (
                          <div className="alert alert-success alert-dismissible fade show" role="alert">
                            <span className="alert-text">The product was successfully added.</span>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Page>;
};
