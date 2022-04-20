namespace nba_api_dotnet;

using Microsoft.EntityFrameworkCore;
using models.players;
using nba_api_dotnet.models.Teams;

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
        options.UseSqlServer(Configuration.GetConnectionString("DanLaptopDB"));
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Player>()
            .HasKey( c => new {c.PlayerID});

        modelBuilder.Entity<Team>()
        .HasKey(c => new { c.TeamID });
    }

    public DbSet<Player>? tbl_Players { get; set; }
    public DbSet<Team>? tbl_Teams { get; set; }
}