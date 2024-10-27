using ITDeskServer.Context;
using ITDeskServer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer("Data Source=TARDEMPC\\SQLEXPRESS;Initial Catalog=ITDeskDb;Integrated Security=True;Connect Timeout=30;Encrypt=True;Trust Server Certificate=True;Application Intent=ReadWrite;Multi Subnet Failover=False");
});


builder.Services.AddIdentityCore<AppUser>(options =>
{
    options.Password.RequiredLength = 6;
}).AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

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
            Name = "Tar�k",
            LastName = "Demir"

        }, "Password12*").Wait();
    }
}

app.Run();