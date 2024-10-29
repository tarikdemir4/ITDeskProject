﻿using ITDeskServer.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ITDeskServer.Services;

public sealed class JwtService
{
    public string CreateToken(AppUser appUser, bool rememberMe)
    {
        string token = string.Empty;

        List<Claim> claims = new();
        claims.Add(new("UserId", appUser.Id.ToString()));
        claims.Add(new("Name", appUser.FirstName + " " + appUser.LastName));
        claims.Add(new("Email", appUser.Email ?? string.Empty));
        claims.Add(new("UserName", appUser.UserName ?? string.Empty));


        DateTime expires = rememberMe ? DateTime.UtcNow.AddMonths(1) : DateTime.Now.AddDays(1);

        JwtSecurityToken jwtSecurityToken = new
            (
            issuer: "Tarık Demir",
            audience: "IT Desk Angular App",
            claims: claims,
            notBefore: DateTime.Now,
            expires: expires,
            signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("my secret key my secret key my secret key 1234 ... my secret key my secret key my secret key 1234 ... my secret key my secret key my secret key 1234 ...")), SecurityAlgorithms.HmacSha512)
            );


        JwtSecurityTokenHandler handler = new();
        token = handler.WriteToken(jwtSecurityToken);




        return token;
    }
}
