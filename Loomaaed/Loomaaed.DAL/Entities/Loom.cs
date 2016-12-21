using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Loomaaed.DAL.Entities
{
    public class Loom
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity), Key]
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        [Index(IsUnique = true)]
        public string Nimi { get; set; }
        [Required]
        public DateTime Synniaasta { get; set; }
        [Required]
        public int Vanus { get; set; }
        [Required]
        public DateTime Lisamisaeg { get; set; }
        [Required]
        public virtual Loomaliik Liik { get; set; }
    }
}
