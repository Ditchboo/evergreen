using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Evergreen.Web.Models;
using Dapper;
using System.Linq;

namespace Evergreen.Web.Repositories
{
    public class ProductRepository : BaseRepository
    {
        public List<Product> GetProducts()
        {
            using var con = GetConnection();
            con.Open();

            return con.Query<Product>("SELECT p.*, pc.Title AS Category, pc.Id AS CategoryId, s.Id AS SupplierId, s.Name AS Supplier " +
                "FROM Product p " +
                "INNER JOIN ProductCategory pc ON p.ProductCategoryId = pc.Id " +
                "INNER JOIN Supplier s ON s.Id = p.SupplierId").ToList();
        }

        public Product GetProductById(int id)
        {
            using var con = GetConnection();
            con.Open();

            return con.QuerySingleOrDefault<Product>("SELECT p.*, pc.Title AS Category, pc.Id AS CategoryId, s.Id AS SupplierId, s.Name AS Supplier " +
                "FROM Product p " +
                "INNER JOIN ProductCategory pc ON p.ProductCategoryId = pc.Id " +
                "INNER JOIN Supplier s ON s.Id = p.SupplierId " +
                "WHERE p.Id = @id", new { id });
        }

        public List<ProductCategory> GetProductCategories()
        {
            using var con = GetConnection();
            con.Open();

            return con.Query<ProductCategory>("SELECT * FROM ProductCategory ORDER BY Title Asc").ToList();
        }

        public ProductCategory CreateProductCategory(ProductCategory prodCat)
        {
            using var con = GetConnection();
            con.Open();

            prodCat.Id = con.ExecuteScalar<int>("INSERT INTO ProductCategory(Title, Description, ImageUrl) VALUES(@Title, @Description, @ImageUrl);" +
                "SELECT LAST_INSERT_ID();", prodCat);

            return prodCat;
        }

        public ProductCategory GetProductsInCategory(int id)
        {
            using var con = GetConnection();
            con.Open();

            var cat = con.QuerySingleOrDefault<ProductCategory>("SELECT * FROM ProductCategory WHERE Id = @id", new { id });

            if (cat != null)
            {
                cat.Products = con.Query<Product>("SELECT * FROM Product WHERE ProductCategoryId = @id AND IsAvailable = 1", new { id }).ToList();
            }
            
            return cat;
        }

        public Product CreateProduct(CreateProduct newProd)
        {
            using var con = GetConnection();
            con.Open();

            var product = con.QuerySingle<Product>(
                "INSERT INTO Product(Title, Description, Cost, ProductCategoryId, SupplierId) VALUES(@Title, @Description, @Cost, @CategoryId, @SupplierId);" +
                "SELECT p.*, pc.Title AS Category FROM Product p INNER JOIN ProductCategory pc ON p.ProductCategoryId = pc.Id WHERE p.Id = LAST_INSERT_ID();", newProd);

            return product;
        }

        public Product UpdateProduct(CreateProduct updateProd)
        {
            using var con = GetConnection();
            con.Open();
            var query = con.Execute("UPDATE Product SET Title = @Title, Description = @Description, Cost = @Cost, ProductCategoryId = @CategoryId, SupplierId = @SupplierId WHERE Id = @Id;", updateProd);
            con.Close();

            return GetProductById(updateProd.Id);
        }

        public Product SetAvailibility(int productId, bool available)
        {
            using var con = GetConnection();
            con.Execute("UPDATE Product SET IsAvailable = @Av WHERE Id = @Id", new { Id = productId, Av = available });
            con.Close();

            return GetProductById(productId);
        }
    }
}
