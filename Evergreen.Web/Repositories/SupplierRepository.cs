using System;
using System.Collections.Generic;
using Evergreen.Web.Models;
using Dapper;
using System.Linq;

namespace Evergreen.Web.Repositories
{
    public class SupplierRepository: BaseRepository
    {
        public List<Supplier> GetSuppliers()
        {
            using var con = GetConnection();
            con.Open();

            return con.Query<Supplier>("SELECT * FROM Supplier ORDER BY Name Asc").ToList();
        }

    }
}
