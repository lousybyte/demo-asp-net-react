using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using ApiDemoBackend.Data.Models;
using Dapper;
using Microsoft.OpenApi.Expressions;
using static Dapper.SqlMapper;

namespace ApiDemoBackend.Data
{
    public class DataRepository : IDataRepository
    {
        private readonly string _connectionString;

        public DataRepository()
        {
            _connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
        }

        public async Task<ProductGetSingleResponse> GetProductAsync(long productId)
        {
            using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();

            var result =  await connection.QueryFirstOrDefaultAsync<ProductGetSingleResponse>(@"
                    SELECT TOP 1 products.id Id, product_name ProductName, brand_id BrandId, category_id CategoryId, list_price ListPrice, brands.brand_name BrandName, cat.category_name CategoryName
                    FROM dbo.products products
                    INNER JOIN dbo.products_brands brands on products.brand_id = brands.id
                    INNER JOIN dbo.products_categories cat on products.brand_id = cat.id
                    WHERE products.id = @Id;",
                    new { Id = productId });
            return result;
        }

        public async Task<ProductGetManyResponse> GetProductsAsync(int pageNumber, int pageSize)
        {
            using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();

            var parameters = new
            {
                PageNumber = pageNumber,
                PageSize   = pageSize
            };

            using var results = await connection.QueryMultipleAsync(@"
                    SELECT products.id Id, product_name ProductName, brand_id BrandId, category_id CategoryId, list_price ListPrice, brands.brand_name BrandName, cat.category_name CategoryName
                    FROM dbo.products products
                    INNER JOIN dbo.products_brands brands on products.brand_id = brands.id
                    INNER JOIN dbo.products_categories cat on products.brand_id = cat.id
                    ORDER BY id
                    OFFSET @PageSize * (@PageNumber - 1) ROWS
                    FETCH NEXT @PageSize ROWS ONLY;

                    SELECT id Id, brand_name Name
                    FROM dbo.products_brands;

                    SELECT id Id, category_name Name
                    FROM dbo.products_categories;", parameters);

            var products = results.Read<Product>().ToList();
            var brands = results.Read<Brand>().ToList();
            var categories = results.Read<Category>().ToList();

            return new ProductGetManyResponse
            {
                Products = products,
                Brands = brands,
                Categories = categories
            };
        }

        public async Task<ProductGetSingleResponse> PostProductAsync(ProductPostRequest product)
        {
            using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();

            var productId = await connection.QueryFirstAsync<long>(@"
                    INSERT INTO dbo.products
                    (product_name, brand_id, category_id, list_price)
                    VALUES(@ProductName, @BrandId, @CategoryId, @ListPrice)

                    SELECT SCOPE_IDENTITY() AS ProductId", product);

            return await GetProductAsync(productId);
        }

        public async Task DeleteProductAsync(long productId)
        {
            using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();

            connection.Execute(@"
                DELETE
                FROM dbo.products
                WHERE id = @Id",
                new { Id = productId }
             );
        }

        public async Task<bool> IsBrandValidAsync(long brandId)
        {
            using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();

            return await connection.QueryFirstAsync<bool>(@"
                SELECT CASE WHEN EXISTS (SELECT id
                FROM dbo.products_brands
                WHERE id = @Id)
                THEN CAST (1 AS BIT)
                ELSE CAST (0 AS BIT) END AS Result",
                new { Id = brandId });
        }

        public async Task<bool> IsCategoryValidAsync(long categoryId)
        {
            using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();

            return await connection.QueryFirstAsync<bool>(@"
                SELECT CASE WHEN EXISTS (SELECT id
                FROM dbo.products_categories
                WHERE id = @Id)
                THEN CAST (1 AS BIT)
                ELSE CAST (0 AS BIT) END AS Result",
                new { Id = categoryId });
        }
    }
}
