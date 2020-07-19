using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Evergreen.Web.Models;
using Evergreen.Web.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Evergreen.Web.Controllers
{
    [Route("api/[controller]")]
    public class ProductCategoryController : ControllerBase
    {
        private ProductRepository _productRepo;

        public ProductCategoryController()
        {
            _productRepo = new ProductRepository();
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<ProductCategory> Get()
        {
            return _productRepo.GetProductCategories();
        }

        // POST api/values
        [HttpPost, Authorize]
        public ProductCategory Post([FromBody] ProductCategory prodCat)
        {
            return _productRepo.CreateProductCategory(prodCat);
        }

    }
}
