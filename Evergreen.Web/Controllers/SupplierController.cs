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
    public class SupplierController : Controller
    {
        private SupplierRepository _supplierRepo;

        public SupplierController()
        {
            _supplierRepo = new SupplierRepository();
        }

        // GET: api/values
        [HttpGet, Authorize]
        public IEnumerable<Supplier> Get()
        {
            return _supplierRepo.GetSuppliers();
        }
    }
}
