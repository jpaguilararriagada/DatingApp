using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.DTO
{
    public class UserRegisterDTO
    {
        [Required()]
        public string Username { get; set; }
        [Required()]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Ingrese clave entre 4 y 8 caracteres")]
        public string Password { get; set; }
        [Required()]
        public string Gender { get; set; }
        [Required()]
        public string KnownAs { get; set; }
        [Required()]
        public DateTime DateOfBirth { get; set; }
        [Required()]
        public string City { get; set; }
        [Required()]
        public string Country { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }

        public UserRegisterDTO()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}