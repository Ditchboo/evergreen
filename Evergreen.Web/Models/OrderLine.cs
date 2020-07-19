using System;
namespace Evergreen.Web.Models
{
    public class OrderLine
    {
        public int ProductId { get; set; }
        public string ProductTitle { get; set; }
        public int Quantity { get; set; }
    }
}
