using Core.Entities;
using Core.Helpers;
using Core.Interfaces;
using Core.Settings;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
/*
var emailConfig = builder.Configuration
        .GetSection("MailSettings")
        .Get<MailSettings>();
builder.Services.AddSingleton(emailConfig);
*/

//builder.Services.Configure<MailSettings>(builder.Configuration.GetSection("MailSettings"));

builder.Services.Configure<JWT>(builder.Configuration.GetSection("Jwt"));

builder.Services.AddIdentity<User, IdentityRole>().AddEntityFrameworkStores<RestaurantContext>();

builder.Services.AddTransient<IMailService, MailService>();

builder.Services.AddControllers();
builder.Services.AddCors(options => options.AddPolicy("AllowAllOrigins",
    builder =>
    {
        builder.AllowAnyOrigin()
                .AllowAnyHeader()
                 .AllowAnyMethod();
    }));
builder.Services.AddScoped<IRestaurantRepository, RestaurantRepository>();
builder.Services.AddScoped<IMenuRepository, MenuRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddDbContext<RestaurantContext>(x => x.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAllOrigins");

app.UseAuthorization();

app.MapControllers();

app.Run();
