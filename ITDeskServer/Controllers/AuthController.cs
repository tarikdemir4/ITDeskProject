using Azure.Core;
using ITDeskServer.DTOs;
using ITDeskServer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ITDeskServer.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public class AuthController : ControllerBase
{

    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;



    public AuthController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    [HttpPost]
    public async Task<IActionResult> Login(LoginDto request, CancellationToken cancellationToken)
    {
        AppUser? appUser = await _userManager.FindByNameAsync(request.UserNameOrEmail);
        if (appUser is null)
        {
            appUser = await _userManager.FindByEmailAsync(request.UserNameOrEmail);
            if (appUser is null)
            {
                return BadRequest(new { Message = "Kullanıcı bulunamadı!" });
            }
        }


        var result = await _signInManager.CheckPasswordSignInAsync(appUser, request.Password, true);

        if (result.IsLockedOut )
        {
            TimeSpan? timeSpan=appUser.LockoutEnd -DateTime.UtcNow;
            if (timeSpan is not null)
            return BadRequest(new { Message = $"Kullanıcınız 3 kere yanlış girildi.Bundan dolayı {Math.Ceiling(timeSpan.Value.TotalMinutes)}  dakika kitlenmiştir." });
        }

        if (result.IsNotAllowed)
        {
            return BadRequest(new { Message = "Mail adresiniz onaylı değil!" });
        }

        if (!result.Succeeded)
        {
            return BadRequest(new { Message = "Şifreniz Yanlış" });
        }

        return Ok();

    }




    private async Task CheckPassword(AppUser appUser, string password)
    {

        if (appUser.WrongTryCount == 3)
        {
            TimeSpan timeSpan = appUser.LockDate - DateTime.Now;
            if (timeSpan.TotalMinutes <= 0)
            {
                appUser.WrongTryCount = 0;
                await _userManager.UpdateAsync(appUser);
            }
            else
            {
                timeSpan = appUser.LastWrongTry.Date - DateTime.Now.Date;
                if (timeSpan.TotalDays < 0)
                {
                    appUser.WrongTryCount = 0;
                    await _userManager.UpdateAsync(appUser);
                }
                else
                {
                    // return BadRequest(new { ErrorMessage = $"Şirenizi yanlış girdiğinizzden dolayı kullanıcınız kitlendi. {Math.Ceiling(timeSpan.TotalMinutes)} dakika daha beklemelisiniz!" });
                }
            }
        }

        var checkPasswordIsCurrect = await _userManager.CheckPasswordAsync(appUser, password);

        if (!checkPasswordIsCurrect)
        {
            TimeSpan timeSpan = appUser.LastWrongTry.Date - DateTime.Now.Date;
            if (timeSpan.TotalDays < 0)
            {
                appUser.WrongTryCount = 0;
                await _userManager.UpdateAsync(appUser);
            }

            if (appUser.WrongTryCount < 3)
            {
                appUser.WrongTryCount++;
                appUser.LastWrongTry = DateTime.Now;
                await _userManager.UpdateAsync(appUser);
            }

            if (appUser.WrongTryCount == 3)
            {
                appUser.LastWrongTry = DateTime.Now;
                appUser.LockDate = DateTime.Now.AddMinutes(15);
                await _userManager.UpdateAsync(appUser);
                // return BadRequest(new { Message = "3 kere şifrenizi yanlış girdiniğiniz için kullanımınız 15 dakika kitlendi! 15 dakika sonra tekrar deneyebilirsiniz." });
            }
            //  return BadRequest(new { Message = $"Şifre Yanlış! Deneme {appUser.WrongTryCount} / 3" });
        }
        appUser.WrongTryCount = 0;
        await _userManager.UpdateAsync(appUser);
    }
}



