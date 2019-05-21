using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.DTO
{
    public class UserRegisterDTO
    {
        [Required()]
        public string Username { get; set; }

         [Required()]
         [StringLength(8, MinimumLength=4, ErrorMessage = "Ingrese clave entre 4 y 8 caracteres")]
        public string Password { get; set; }
    }
}