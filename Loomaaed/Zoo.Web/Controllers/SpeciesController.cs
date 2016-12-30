using Zoo.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Zoo.Web.Controllers
{
    public class SpeciesController : ApiController
    {
        private ZooDb db = new ZooDb();
        // GET: api/Species
        public IEnumerable<object> Get()
        {
            return db.Species.OrderBy(x => x.Name);
        }
    }
}
