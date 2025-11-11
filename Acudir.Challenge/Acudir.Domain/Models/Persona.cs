using System.ComponentModel.DataAnnotations;

namespace Acudir.Api.Domain.Models
{
    public class Persona
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre es obligatorio.")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "El apellido es obligatorio.")]
        public string Apellido { get; set; }

        [Required(ErrorMessage = "El email es obligatorio.")]
        [EmailAddress(ErrorMessage = "Debe ser un email válido.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "La edad es obligatoria.")]
        [Range(18, int.MaxValue, ErrorMessage = "Debe ser mayor o igual a 18 años.")]
        public int Edad { get; set; }
    }
}
