using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using nba_api_dotnet;
using nba_api_dotnet.models.players;

var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

//ADD CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.WithOrigins(
                            "https://dan933.github.io/2022-NBA-Prediction-Application",
                            "https://nbaseasonpredictor.netlify.app",
                            "https://nba-app.azurewebsites.net",
                            "http://localhost:3000"
                            )                            
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                      });
});

// Add services to the container.

builder.Services.AddControllers();
string connString = builder.Configuration.GetConnectionString("AzureDatabase");
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
        options.UseSqlServer(builder.Configuration.GetConnectionString("DanDesktopDB"));
    });
}else if(builder.Environment.IsStaging()){

    builder.Services.AddDbContext<NBAContext>(options =>
    {
        options.UseSqlServer(builder.Configuration.GetConnectionString("AzureDatabase"));
    });

}else{

    builder.Services.AddDbContext<NBAContext>(options =>
    {
        options.UseSqlServer(builder.Configuration.GetConnectionString("AzureStagingDatabase"));
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

app.UseAuthorization();

app.UseCors(MyAllowSpecificOrigins);

app.MapControllers();


app.Run();
