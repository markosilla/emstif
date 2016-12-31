using System;
using NUnit.Framework;
using Zoo.DAL;
using Zoo.DAL.Entities;
using Zoo.Web.Controllers;
using System.Collections.Generic;

namespace Zoo.Test
{
    [TestFixture]
    public class ZooDALNUnitTest1
    {
        [Test]
        public void AddAnimal()
        {
            ZooDb db = new ZooDb();
            string testname = "Test" + DateTime.Now.Millisecond;
            Animal animal = new Animal { Name = testname, Species = db.Species.Find(1), YearOfBirth = 1999, CreationDate = DateTime.Now };
            AnimalsController api = new AnimalsController();

            db.Animals.Add(animal);
            db.SaveChanges();
            
            Animal stored = db.Animals.Find(animal.Id);
            
            Assert.AreEqual(stored.Name, testname);
        }
    }
}