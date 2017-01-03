using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Zoo.DAL.Entities
{
    public class Animal
    {
        public int AnimalID { get; set; }
        public string Name { get; set; }
        public int YearOfBirth { get; set; }
        public DateTime CreationDate { get; set; }
        public int SpeciesID { get; set; }
        public virtual Species Species { get; set; }
    }
}
