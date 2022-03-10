using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using ApiDemoBackend.Data;
using ApiDemoBackend.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace ApiDemoBackend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IDataRepository    _dataRepository;
        private readonly IProductCache      _cache;
        private readonly IHttpClientFactory _clientFactory;

        public ProductsController(IDataRepository dataRepository, IProductCache cache, IHttpClientFactory clientFactory)
        {
            _dataRepository = dataRepository;
            _cache          = cache;
            _clientFactory  = clientFactory;
        }

        [HttpGet("{productId}")]
        public async Task<ActionResult<ProductGetSingleResponse>> GetProductAsync(long productId)
        {
            var product = _cache.Get(productId);

            if (product == null)
            {
                product = await _dataRepository.GetProductAsync(productId);

                if (product == null)
                {
                    return NotFound();
                }

                _cache.Set(product);
            }

            return product;
        }

        [HttpGet]
        public async Task<ProductGetManyResponse> GetProductsAsync(int page = 1, int pageSize = 20)
        {
            return await _dataRepository.GetProductsAsync(page, pageSize);
        }

        [HttpPost]
        public async Task<ActionResult<ProductGetSingleResponse>> PostProductAsync(ProductPostRequest productPostRequest)
        {
            var savedProduct = await _dataRepository.PostProductAsync(productPostRequest);

            return CreatedAtAction(nameof(GetProductAsync), new {productId = savedProduct.Id }, savedProduct);
        }

        [HttpDelete("{productId}")]
        public async Task<ActionResult> DeleteProductAsync(long productId)
        {
            var product = await _dataRepository.GetProductAsync(productId);

            if (product == null)
            {
                return NotFound();
            }

            await _dataRepository.DeleteProductAsync(productId);
            _cache.Remove(productId);

            return Ok();
        }

    }
}
