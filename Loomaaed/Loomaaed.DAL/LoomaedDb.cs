using Loomaaed.DAL.Entities;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Diagnostics;

namespace Loomaaed.DAL
{
    public class LoomaaedDb : DbContext
    {
        public LoomaaedDb() : base("LoomaaedDb")
        {
            Database.Log = sql => Debug.Write(sql);
        }
        public DbSet<Loom> Loomad { get; set; }
        public DbSet<Loomaliik> Loomaliigid { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}
