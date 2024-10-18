using ITDesk.WebApi.DTOs;
using ITDesk.WebApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITDesk.WebApi.Controllers;
[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    [HttpPost]
    public IActionResult Register(RegisterDto request)
    {
         #region İş Kuralları

        if (request.Name.Length < 3 || string.IsNullOrWhiteSpace(request.Name))
        {
            throw new ArgumentException("İsim 3 karakterden kısa olamaz");
        }

        if (request.LastName.Length < 3 || string.IsNullOrWhiteSpace(request.LastName))
        {
            throw new ArgumentException("Soyisim 3 karakterden kısa olamaz");
        }

        if (!request.Email.Contains("@") || string.IsNullOrWhiteSpace(request.Email) || request.Email.Length < 4)
        {
            throw new ArgumentException("Geçerli bir mail adresi giriniz");
        }

        if (request.Password.Length < 1 || string.IsNullOrWhiteSpace(request.Password))
        {
            throw new ArgumentException("Şifre 1 karakterden küçük olamaz");
        }
        #endregion

        #region Password Hashleme

        byte[] PasswordHash;
        byte[] PasswordSalt;

        PasswordService.CreatePassword(request.Password, out PasswordHash, out PasswordSalt);
        #endregion
    }
}
