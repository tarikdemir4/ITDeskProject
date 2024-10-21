using FluentValidation;
using ITDesk.WebApi.DTOs;
using ITDesk.WebApi.Models;
using ITDesk.WebApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ITDesk.WebApi.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IValidator<RegisterDto> _registerDtoValidator;
    public AuthController(IValidator<RegisterDto>registerDtorValidator)
    {
        _registerDtoValidator = registerDtorValidator;
    }
    [HttpPost]
    public IActionResult Register(RegisterDto request)
    {
        #region İş Kuralları

        var result = _registerDtoValidator.Validate(request);
        if (!result.IsValid)
        {
            throw new ValidationException(result.Errors[0].ErrorMessage);
        }

        #endregion

        #region Password Hashleme

        byte[] PasswordHash;
        byte[] PasswordSalt;

        PasswordService.CreatePassword(request.Password, out PasswordHash, out PasswordSalt);
        #endregion

        #region User Nesnesi Oluşturma

        User user = new()
        {
            Email = request.Email,
            Name = request.Name,
            LastName = request.LastName,
            PasswordHash = PasswordHash,
            PasswordSalt = PasswordSalt

        };

        #endregion

        return Ok(new { Message = "Kullanıcı Kaydı başarıyla tmamalandı " });
    }
}
