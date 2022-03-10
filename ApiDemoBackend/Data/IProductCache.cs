using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiDemoBackend.Data.Models;

namespace ApiDemoBackend.Data
{
    public interface IProductCache
    {
        ProductGetSingleResponse Get(long productId);
        void Remove(long productId);
        void Set(ProductGetSingleResponse product);
    }
}
