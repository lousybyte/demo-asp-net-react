using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiDemoBackend.Data.Models;

namespace ApiDemoBackend.Data
{
    public interface IDataRepository
    {
        Task<ProductGetSingleResponse> GetProductAsync(long productId);
        Task<ProductGetManyResponse> GetProductsAsync(int pageNumber, int pageSize);
        Task<ProductGetSingleResponse> PostProductAsync(ProductPostRequest product);
        Task DeleteProductAsync(long productId);

        Task<bool> IsBrandValidAsync(long brandId);
        Task<bool> IsCategoryValidAsync(long categoryId);
    }
}
