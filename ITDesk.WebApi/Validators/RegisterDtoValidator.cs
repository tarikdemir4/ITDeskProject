using FluentValidation;
using ITDesk.WebApi.DTOs;

namespace ITDesk.WebApi.Validators;

public class RegisterDtoValidator : AbstractValidator<RegisterDto>
{
    public RegisterDtoValidator()
    {
        RuleFor(p => p.Name).NotEmpty().WithMessage("Ad alanı boş olamaz");
        RuleFor(p => p.Name).NotNull().WithMessage("Ad alanı boş olamaz!");
        RuleFor(p => p.Name).MinimumLength(3).WithMessage("Ad alanı 3 karakterden az olamaz!");
        RuleFor(p => p.LastName).NotEmpty().WithMessage("Soyad alanı boş olamaz");
        RuleFor(p => p.LastName).NotNull().WithMessage("Soyad alanı boş olamaz!");
        RuleFor(p => p.LastName).MinimumLength(3).WithMessage("Soyad 3 karakterden az olamaz!");
        RuleFor(p => p.Email).NotEmpty().WithMessage("Email alanı boş olamaz");
        RuleFor(p => p.Email).NotNull().WithMessage("Email alanı boş olamaz");
        RuleFor(p => p.Email).EmailAddress().WithMessage("Geçerli bir email adresi giriniz");
        RuleFor(p => p.Password).NotNull().WithMessage("Password alanı boş olamaz");
        RuleFor(p => p.Password).NotEmpty().WithMessage("Password alanı boş olamaz");
        RuleFor(p => p.Password).MinimumLength(1).WithMessage("Password 1 karakterden az olamaz");
    }
}
