using System;
using System.Collections.Generic;

namespace Evergreen.Web.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public string OrderStatus { get; set; }
        public DateTime CollectionDate { get; set; }
        public List<OrderLine> Products { get; set; }
        public string CustomerFirstName { get; set; }
        public string CustomerLastName { get; set; }
    }
}
