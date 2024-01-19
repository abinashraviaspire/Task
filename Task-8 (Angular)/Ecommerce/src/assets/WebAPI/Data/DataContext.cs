using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.Models.Domain;

namespace WebAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {}


        public virtual DbSet<SignUpData> signUpDatas {get; set;}
        public DbSet<Product>Product { get; set; }


    }
}
