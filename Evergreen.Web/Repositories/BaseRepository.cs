using System;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace Evergreen.Web.Repositories
{
    public class BaseRepository
    {
        private MySqlConnection _connection;

        protected MySqlConnection GetConnection()
        {
            if (_connection != null)
            {
                return _connection;
            }

            var connectionString = Environment.GetEnvironmentVariable("EVERGREEN_CON_STRING");

            return _connection = new MySqlConnection(connectionString);
        }
    }
}
