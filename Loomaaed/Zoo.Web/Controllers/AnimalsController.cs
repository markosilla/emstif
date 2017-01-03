using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
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
        [HttpGet]
        public IEnumerable<object> GetAnimals()
        {
            return db.Animals.Include(s => s.Species).OrderBy(x => x.Name);
        }

        // GET: api/Animals/5 - Get single animal, POST body empty
        [HttpGet]
        public HttpResponseMessage GetAnimal(int id)
        {
            Animal animal = db.Animals.Find(id);
            if (animal == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Animal not found for the given Id");
            }
            return Request.CreateResponse(HttpStatusCode.OK, animal);
        }

        [HttpGet]
        public object GetWhereName(string name, int speciesId)
        {
            /*TODO: optimize */
            return db.Animals
                .Include(s => s.Species)
                .FirstOrDefault(u => u.Name == name && u.Species.SpeciesID == speciesId);
        }

        // PUT: api/Animals/5 - Update animal, POST body JSON str
        [HttpPut]
        public HttpResponseMessage PutAnimal(int id, Animal animal)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Model state is not valid");
            }

            if (id != animal.AnimalID)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Unable to find the animal with the given Id");
            }

            animal.Species = db.Species.Find(animal.SpeciesID);

            db.Entry(animal).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnimalExists(id))
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Unable to find the animal with the given Id");
                }
                else
                {
                    throw;
                }
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // POST: api/Animals - New animal, POST body JSON str
        [HttpPost]
        public HttpResponseMessage PostAnimal(Animal animal)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Unable to create the animal with the given Id");
            }

            animal.Species = db.Species.Find(animal.SpeciesID);

            db.Animals.Add(animal);
            db.SaveChanges();

            return Request.CreateResponse<Animal>(HttpStatusCode.Created, animal);
        }

        // DELETE: api/Animals/5 - Delete animal, POST body JSON str
        [HttpDelete]
        public HttpResponseMessage DeleteAnimal(int id)
        {
            Animal animal = db.Animals.Find(id);
            if (animal == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Unable to delete the animal with the given Id");
            }

            db.Animals.Remove(animal);
            db.SaveChanges();

            return new HttpResponseMessage(HttpStatusCode.NoContent);
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
            return db.Animals.Count(e => e.AnimalID == id) > 0;
        }
    }
}