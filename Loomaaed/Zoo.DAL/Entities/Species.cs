using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Zoo.DAL.Entities
{
    public class Species
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity), Key]
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        [Index(IsUnique = true)]
        public string Name { get; set; }
    }
}
