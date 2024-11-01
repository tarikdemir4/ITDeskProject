using ITDeskServer.Context;
using ITDeskServer.Models;
using ITDeskServer.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(configure =>
{

    configure.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod();
    });

});
#region Dependency Injection

builder.Services.AddScoped<JwtService>();
#endregion

#region Authentication

builder.Services.AddAuthentication().AddJwtBearer(opt =>
{
    opt.TokenValidationParameters = new()
    {
        ValidateIssuer = true, //tokeni gönderen kýsý
        ValidateAudience = true, //tokený kullanacak sýte yzda kýsý býlgýsý
        ValidateIssuerSigningKey = true, //tokenýn guvenlýk anahtarý uretmesýný saglayan guvenlýk sozcugu
        ValidateLifetime = true, // tokenýn yasam suresýný kontrol etmek
        ValidIssuer = "Tarýk Demir",
        ValidAudience = "IT Desk Angular App",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("my secret key my secret key my secret key 1234 ... my secret key my secret key my secret key 1234 ... my secret key my secret key my secret key 1234 ..."))
    };
});
#endregion

#region DbContext ve Identity
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer("Data Source=TARDEMPC\\SQLEXPRESS;Initial Catalog=ITDeskDb;Integrated Security=True;Connect Timeout=30;Encrypt=True;Trust Server Certificate=True;Application Intent=ReadWrite;Multi Subnet Failover=False");
});


builder.Services.AddIdentity<AppUser, AppRole>(options =>
{
    options.Password.RequiredLength = 6;
    options.SignIn.RequireConfirmedEmail = true;
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromSeconds(15);
    options.Lockout.MaxFailedAccessAttempts = 2;
    options.Lockout.AllowedForNewUsers = true;

})
     .AddEntityFrameworkStores<ApplicationDbContext>()
     .AddDefaultTokenProviders();
#endregion

#region Presentation
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(setup =>
{
    var jwtSecuritySheme = new OpenApiSecurityScheme
    {
        BearerFormat = "JWT",
        Name = "JWT Authentication",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = JwtBearerDefaults.AuthenticationScheme,
        Description = "Put **_ONLY_** yourt JWT Bearer token on textbox below!",

        Reference = new OpenApiReference
        {
            Id = JwtBearerDefaults.AuthenticationScheme,
            Type = ReferenceType.SecurityScheme
        }
    };

    setup.AddSecurityDefinition(jwtSecuritySheme.Reference.Id, jwtSecuritySheme);

    setup.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    { jwtSecuritySheme, Array.Empty<string>() }
                });
});

#endregion

#region MiddleWares


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

using (var scoped = app.Services.CreateScope())
{
    var userManager = scoped.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
    if (!userManager.Users.Any())
    {
        userManager.CreateAsync(new()
        {
            Email = "test@test.com",
            UserName = "test",
            FirstName = "Tarýk",
            LastName = "Demir",
            EmailConfirmed = true

        }, "Password12*").Wait();
    }
}

app.Run();

#endregion