using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiDemoBackend.Data.Models
{
    public class ProductGetSingleResponse
    {
        public long Id { get; set; }
        public string ProductName { get; set; }
        public long BrandId { get; set; }
        public string BrandName { get; set; }
        public long CategoryId { get; set; }
        public string CategoryName { get; set; }
        public decimal ListPrice { get; set; }
    }
}
