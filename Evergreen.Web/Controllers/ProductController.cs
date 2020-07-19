using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Evergreen.Web.Models;
using Evergreen.Web.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Evergreen.Web.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private ProductRepository _productRepo;

        public ProductController()
        {
            _productRepo = new ProductRepository();
        }

        [HttpGet()]
        public IEnumerable<Product> Get()
        {
            return _productRepo.GetProducts();
        }

        [HttpGet("{id}")]
        public Product GetById(int id)
        {
            return _productRepo.GetProductById(id);
        }

        [HttpPost, Authorize]
        public Product Post([FromBody] CreateProduct newProduct)
        {
            return _productRepo.CreateProduct(newProduct);
        }

        [HttpPut, Authorize]
        public Product Put([FromBody] CreateProduct updateProduct)
        {
            return _productRepo.UpdateProduct(updateProduct);
        }


        [HttpGet("category/{id}")]
        public ProductCategory Get(int id)
        {
            return _productRepo.GetProductsInCategory(id);
        }

        [HttpPut("availability/{id}"), Authorize]
        public Product Put(int id, [FromQuery] bool available)
        {
            return _productRepo.SetAvailibility(id, available);
        }
    }
}
