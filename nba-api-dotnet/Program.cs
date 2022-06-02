using System.Reflection;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using nba_api_dotnet;
using nba_api_dotnet.models.players;
using WebAPIApplication;
using Microsoft.AspNetCore.Http.Json;
using System.Text.Json.Serialization;

var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

var domain = $"https://{builder.Configuration["Auth0:Domain"]}/";

// Set the JSON serializer options
// builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options =>
// {
//     options.SerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
// });

//ADD CORS
builder.Services.AddCors(options =>
{
    if (builder.Environment.IsDevelopment())
    {
        options.AddPolicy(name: MyAllowSpecificOrigins,
                        builder =>
                        {
                            builder.WithOrigins(
                            "http://localhost:3000"
                            )
                            .AllowCredentials()
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                        });
    }else{
        options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.WithOrigins(
                            "https://dan933.github.io/2022-NBA-Prediction-Application",
                            "https://nbaseasonpredictor.netlify.app",
                            "https://nba-app.azurewebsites.net"
                            )                
                            .AllowCredentials()            
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                      });        
    }
});

    
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = domain;
        options.Audience = builder.Configuration["Auth0:Audience"];
        // If the access token does not have a `sub` claim, `User.Identity.Name` will be `null`. Map it to a different claim by setting the NameClaimType below.
        options.TokenValidationParameters = new TokenValidationParameters
        {
            NameClaimType = ClaimTypes.NameIdentifier
        };
    });
builder.Services.AddAuthorization(options =>
    {
        options.AddPolicy("read:players", policy => policy.Requirements.Add(new HasScopeRequirement("read:players", domain)));
    });

    builder.Services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "NBA API",
        Description = "NBA API to preform CRUD",
        TermsOfService = new Uri("https://example.com/terms"),
        Contact = new OpenApiContact
        {
            Name = "Example Contact",
            Url = new Uri("https://example.com/contact")
        },
        License = new OpenApiLicense
        {
            Name = "Example License",
            Url = new Uri("https://example.com/license")
        }
    });

    // using System.Reflection;
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});

if(builder.Environment.IsDevelopment()){
    builder.Services.AddDbContext<NBAContext>(options =>
    {
        options.UseSqlServer(builder.Configuration.GetConnectionString("EveDesktopDB"));
    });
}else if(builder.Environment.IsStaging()){

    builder.Services.AddDbContext<NBAContext>(options =>
    {
        options.UseSqlServer(builder.Configuration["AzureStagingDatabase"]);
    });

}else{

    builder.Services.AddDbContext<NBAContext>(options =>
    {
        options.UseSqlServer(builder.Configuration["AzureDatabase"]);
    });
}



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.UseCors(MyAllowSpecificOrigins);

app.MapControllers();




app.Run();
