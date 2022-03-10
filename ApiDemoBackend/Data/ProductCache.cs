using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiDemoBackend.Data.Models;
using Microsoft.Extensions.Caching.Memory;

namespace ApiDemoBackend.Data
{
    public class ProductCache : IProductCache
    {
        private MemoryCache _cache { get; set; }
        public ProductCache()
        {
            _cache = new MemoryCache(new MemoryCacheOptions
            {
                SizeLimit = 100
            });
        }

        private string GetCacheKey(long productId) => $"Question-{productId}";


        public ProductGetSingleResponse Get(long productId)
        {
            _cache.TryGetValue(GetCacheKey(productId), out ProductGetSingleResponse product);

            return product;
        }

        public void Remove(long productId)
        {
            _cache.Remove(GetCacheKey(productId));
        }

        public void Set(ProductGetSingleResponse product)
        {
            var cacheEntryOptions = new MemoryCacheEntryOptions().SetSize(1);
            _cache.Set(GetCacheKey(product.Id), product, cacheEntryOptions);
        }
    }
}
