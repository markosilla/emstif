using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using Zoo.DAL;
using Zoo.DAL.Entities;

namespace Zoo.Web.Controllers
{
    public class AnimalsController : ApiController
    {
        private ZooDb db = new ZooDb();

        // GET: api/Animals - List all animals, POST body empty
        public IEnumerable<object> GetAnimals()
        {
            return db.Animals.OrderBy(x => x.Name);
        }

        // GET: api/Animals/5 - Get single animal, POST body empty
        [ResponseType(typeof(Animal))]
        public IHttpActionResult GetAnimal(int id)
        {
            Animal animal = db.Animals.Find(id);
            if (animal == null)
            {
                return NotFound();
            }

            return Ok(animal);
        }

        // PUT: api/Animals/5 - Update animal, POST body JSON str
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAnimal(int id, Animal animal)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != animal.Id)
            {
                return BadRequest();
            }

            db.Entry(animal).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnimalExists(id))
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
        public IHttpActionResult PostAnimal(Animal animal)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Animals.Add(animal);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = animal.Id }, animal);
        }

        // DELETE: api/Animals/5 - Delete animal, POST body JSON str
        [ResponseType(typeof(Animal))]
        public IHttpActionResult DeleteAnimal(int id)
        {
            Animal animal = db.Animals.Find(id);
            if (animal == null)
            {
                return NotFound();
            }

            db.Animals.Remove(animal);
            db.SaveChanges();

            return Ok(animal);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AnimalExists(int id)
        {
            return db.Animals.Count(e => e.Id == id) > 0;
        }
    }
}