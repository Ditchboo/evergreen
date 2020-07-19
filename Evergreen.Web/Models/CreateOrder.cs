using System;
using System.Collections.Generic;

namespace Evergreen.Web.Models
{
    public class CreateOrder
    {
        public Customer Customer { get; set; }
        public List<OrderLine> Products { get; set; }
        public string CardToken { get; set; }
        public DateTime CollectionSlot { get; set; }
    }
}
