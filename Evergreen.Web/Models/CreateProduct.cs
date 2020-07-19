﻿using System;
namespace Evergreen.Web.Models
{
    public class CreateProduct
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Cost { get; set; }
        public bool IsAvailable { get; set; }
        public int CategoryId { get; set; }
        public int SupplierId { get; set; }
    }
}
