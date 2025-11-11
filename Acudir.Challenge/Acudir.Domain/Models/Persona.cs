using System.ComponentModel.DataAnnotations;

namespace Acudir.Api.Domain.Models
{
    public class Persona
    {
        public int Id { get; set; }
        [Required]
        public string Nombre { get; set; }
        [Required]
        public string Apellido { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public int Edad { get; set; }
    }
}
