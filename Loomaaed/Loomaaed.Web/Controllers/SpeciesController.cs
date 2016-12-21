using Loomaaed.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Loomaaed.Web.Controllers
{
    public class SpeciesController : ApiController
    {
        private LoomaaedDb db = new LoomaaedDb();
        // GET: api/Species
        public IEnumerable<object> Get()
        {
            return db.Loomaliigid.OrderBy(x => x.Nimetus);
        }
    }
}
