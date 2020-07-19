using System;
using System.Collections.Generic;

namespace Evergreen.Web.Models
{
    public class ProductCategory
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }

        public List<Product> Products { get; set; }
    }
}
