namespace nba_api_dotnet;

using Microsoft.EntityFrameworkCore;
using models.players;

public class NBAContext : DbContext
{
    protected readonly IConfiguration Configuration;

    public NBAContext(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        // connect to sql server with connection string from app settings
        options.UseSqlServer(Configuration.GetConnectionString("WebApiDatabase"));
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Player>()
            .HasNoKey();
    }

    public DbSet<Player> Players { get; set; }
}