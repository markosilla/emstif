using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Zoo.DAL.Entities
{
    public class Species
    {
        public int SpeciesID { get; set; }
        public string Name { get; set; }
    }
}
