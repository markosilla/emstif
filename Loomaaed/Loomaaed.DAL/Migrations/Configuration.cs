namespace Loomaaed.DAL.Migrations
{
    using Entities;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<LoomaaedDb>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(LoomaaedDb context)
        {
            Loomaliik rebane = new Loomaliik { Id = 1, Nimetus = "Rebane" };
            Loomaliik janes = new Loomaliik { Id = 2, Nimetus = "Jänes" };

            context.Loomaliigid.Add(rebane);
            context.Loomaliigid.Add(janes);

            var lists = new List<Loom>
            {
                new Loom { Id=1, Nimi = "Rein",Liik = rebane,Vanus=1,Synniaasta=DateTime.Now,Lisamisaeg=DateTime.Now },
                new Loom { Id=2, Nimi = "Juta",Liik = janes,Vanus=2,Synniaasta=DateTime.Now,Lisamisaeg=DateTime.Now },
            };

            lists.ForEach(s => context.Loomad.Add(s));
            context.SaveChanges();
        }
    }
}
