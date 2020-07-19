using System;
using Dapper;
using Evergreen.Web.Models;
using System.Linq;
using System.Linq.Expressions;
using System.Collections.Generic;

namespace Evergreen.Web.Repositories
{
    public class OrderRepository : BaseRepository
    {
        public int CalculateOrderTotal(CreateOrder createOrder)
        {
            using var con = GetConnection();
            var productIds = createOrder.Products.Select(x => x.ProductId);
            var prods = con.Query<Product>("SELECT * FROM Product WHERE Id IN @productIds", new { productIds }).ToList();

            int total = 0;

            foreach(var p in prods)
            {
                var quantity = createOrder.Products.Where(x => x.ProductId == p.Id).First().Quantity;
                total += p.Cost * quantity;
            }

            return total;
        }

        public int CreateOrder(CreateOrder createOrder)
        {
            using var con = GetConnection();
            var customerId = con.ExecuteScalar<int>
                ("INSERT INTO Customer(FirstName, LastName, EmailAddress) VALUES(@FirstName, @LastName, @EmailAddress); SELECT LAST_INSERT_ID();", createOrder.Customer);


            var orderId = con.ExecuteScalar<int>("INSERT INTO PurchaseOrder(CustomerId, PreferredCollectionSlot) VALUES(@CustomerId, @Slot); SELECT LAST_INSERT_ID();", new {
                CustomerId = customerId,
                Slot = createOrder.CollectionSlot
            });

            var orderProducts = con.Query<Product>("SELECT * FROM Product WHERE Id IN @productIds", new { productIds = createOrder.Products.Select(x => x.ProductId) });

            con.Execute("INSERT INTO OrderLine(PurchaseOrderId, ProductId, Quantity, Cost) VALUES(@OrderId, @ProductId, @Quantity, @Cost);", createOrder.Products.Select(x => new
            {
                OrderId = orderId,
                x.ProductId,
                x.Quantity,
                Cost = x.Quantity * orderProducts.Where(y => y.Id == x.ProductId).First().Cost
            }));

            return orderId;
        }

        public List<Order> GetOrdersByStatus(string status)
        {
            using var con = GetConnection();
            var orders = con.Query<Order>("SELECT po.Id AS OrderId, po.PreferredCollectionSlot AS CollectionDate, c.FirstName AS CustomerFirstName, c.LastName AS CustomerLastName " +
                "FROM PurchaseOrder po " +
                "INNER JOIN Customer c " +
                "ON c.Id = po.CustomerId " +
                "INNER JOIN OrderStatus os " +
                "ON os.Id = po.OrderStatusId " +
                "WHERE os.Code = @status", new { status }).ToList();

            orders.ForEach(delegate (Order o)
            {
                o.Products = con.Query<OrderLine>("SELECT ol.ProductId AS ProductId, ol.Quantity AS Quantity, p.Title AS ProductTitle FROM OrderLine ol INNER JOIN Product p ON p.Id = ol.ProductId WHERE ol.PurchaseOrderId = @orderId", new { orderId = o.OrderId }).ToList();
            });

            return orders;
        }

        public bool SetOrderStatus(int orderId, string statusCode)
        {
            using var con = GetConnection();
            int statusId = con.ExecuteScalar<int>("SELECT Id FROM OrderStatus WHERE Code = @statusCode", new { statusCode });

            try
            {
                con.Execute("UPDATE PurchaseOrder SET OrderStatusId = @statusId WHERE Id = @orderId", new { orderId, statusId });
                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }
    }
}
