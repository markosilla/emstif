using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Zoo.DAL.Entities
{
    public class Animal
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity), Key]
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        [Required]
        public int YearOfBirth { get; set; }
        [Required]
        public DateTime CreationDate { get; set; }
        [Required]
        public virtual Species Species { get; set; }
    }
}
