using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress(ErrorMessage = "Formato de email invalido!")]
        public string Email { get; set; }

        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais!")]
        public string Password { get; set; }

        [Required]
        public string DisplayName { get; set; }

        [Required]
        public string Username { get; set; }

    }
}