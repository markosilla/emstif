using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Loomaaed.DAL.Entities
{
    public class Loomaliik
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity), Key]
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        [Index(IsUnique = true)]
        public string Nimetus { get; set; }
    }
}
