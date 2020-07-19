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
    public class OrderController : Controller
    {
        private OrderRepository _orderRepo;

        public OrderController()
        {
            _orderRepo = new OrderRepository();
        }

        [HttpPost("total")]
        public dynamic GetOrderTotal([FromBody] CreateOrder createOrder)
        {
            var orderTotal = _orderRepo.CalculateOrderTotal(createOrder);

            return new
            {
                total = orderTotal
            };
        }

        // POST api/values
        [HttpPost]
        public dynamic Post([FromBody] CreateOrder createOrder)
        {
            return new
            {
                orderId = this._orderRepo.CreateOrder(createOrder)
            };
        }

        [HttpPut("{id}/status"), Authorize]
        public dynamic SetStatus(int id, [FromQuery] string newStatus)
        {
            var update = _orderRepo.SetOrderStatus(id, newStatus);

            return new
            {
                success = update
            };
        }

        [HttpGet("search"), Authorize]
        public List<Order> GetOrders([FromQuery] string status)
        {
            return _orderRepo.GetOrdersByStatus(status);
        } 
    }
}
