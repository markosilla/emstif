using Zoo.DAL.Entities;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Diagnostics;

namespace Zoo.DAL
{
    public class ZooDb : DbContext
    {
        public ZooDb() : base("ZooDb")
        {
            Database.Log = sql => Debug.Write(sql);
        }
        public DbSet<Animal> Animals { get; set; }
        public DbSet<Species> Species { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}
