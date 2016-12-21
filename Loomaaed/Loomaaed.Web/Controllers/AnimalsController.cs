using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using Loomaaed.DAL;
using Loomaaed.DAL.Entities;

namespace Loomaaed.Web.Controllers
{
    public class AnimalsController : ApiController
    {
        private LoomaaedDb db = new LoomaaedDb();

        // GET: api/Animals - List all animals, POST body empty
        public IEnumerable<object> GetLoomad()
        {
            return db.Loomad.OrderBy(x => x.Nimi);
        }

        // GET: api/Animals/5 - Get single animal, POST body empty
        [ResponseType(typeof(Loom))]
        public IHttpActionResult GetLoom(int id)
        {
            Loom loom = db.Loomad.Find(id);
            if (loom == null)
            {
                return NotFound();
            }

            return Ok(loom);
        }

        // PUT: api/Animals/5 - Update animal, POST body JSON str
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLoom(int id, Loom loom)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != loom.Id)
            {
                return BadRequest();
            }

            db.Entry(loom).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoomExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Animals - New animal, POST body JSON str
        //[ResponseType(typeof(Loom))]
        public IHttpActionResult PostLoom(Loom loom)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Loomad.Add(loom);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = loom.Id }, loom);
        }

        // DELETE: api/Animals/5 - Delete animal, POST body JSON str
        [ResponseType(typeof(Loom))]
        public IHttpActionResult DeleteLoom(int id)
        {
            Loom loom = db.Loomad.Find(id);
            if (loom == null)
            {
                return NotFound();
            }

            db.Loomad.Remove(loom);
            db.SaveChanges();

            return Ok(loom);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LoomExists(int id)
        {
            return db.Loomad.Count(e => e.Id == id) > 0;
        }
    }
}