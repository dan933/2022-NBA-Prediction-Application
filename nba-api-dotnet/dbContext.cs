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

    public virtual DbSet<PlayerSelection> tbl_PlayerSelection { get; set; } = null!;
    public virtual DbSet<Player> tbl_Players { get; set; } = null!;
    public virtual DbSet<Team> tbl_Teams { get; set; } = null!;
    public virtual DbSet<User> tbl_Users { get; set; } = null!;
    public virtual DbSet<PlayerSelectionView> view_Team { get; set; } = null!;
    public virtual DbSet<WinChanceView> view_WinChance { get; set; } = null!;

    
    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        var IsDevelopment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == Environments.Development;
        var IsProduction = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == Environments.Production;
        var IsStaging = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == Environments.Staging;

        if(IsDevelopment){
            // connect to sql server with connection string from app settings

            options.UseSqlServer(Configuration.GetConnectionString("DanLaptopDB"));

        }else if(IsStaging){
             options.UseSqlServer(Configuration["AzureStagingDatabase"]);
        }else
        {
            // connect to sql server with connection string from app settings

            options.UseSqlServer(Configuration["AzureDatabase"]);
        }

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Player>(entity =>
        {
            entity.HasKey(c => new { c.PlayerID });

            entity.ToTable("tbl_Players");

            entity.Property(e => e.PlayerID)
                    .ValueGeneratedNever();
            //.HasColumnName("PlayerID");

            entity.Property(e => e.FirstName).HasMaxLength(35);

            entity.Property(e => e.LastName).HasMaxLength(35);
        });

        modelBuilder.Entity<PlayerSelection>(entity =>
        {
            entity.HasKey(ps => ps.PlayerSelectionID);

            entity.ToTable("tbl_PlayerSelection");

            entity.HasIndex(e => new { e.PlayerID, e.TeamID }, "AK_PlayerSelection")
            .IsUnique();

            entity.Property(e => e.PlayerID).HasColumnName("PlayerID");

            entity.Property(e => e.TeamID).HasColumnName("TeamID");

            entity.HasOne(d => d.Player)
                    .WithMany()
                    .HasForeignKey(d => d.PlayerID);

            entity.HasOne(d => d.Team)
                .WithMany()
                .HasForeignKey(d => d.TeamID);

        });

        modelBuilder.Entity<Team>(entity =>
        {
            entity.HasKey(e => e.TeamID);

            entity.ToTable("tbl_Teams");

            entity.HasIndex(e => new { e.TeamName, e.UserId }, "AK_TeamName")
            .IsUnique();

            entity.Property(e => e.TeamID).HasColumnName("TeamID");

            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.Property(e => e.TeamName).HasMaxLength(35);
        });

        modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UserID);

                entity.ToTable("tbl_Users");

                entity.Property(e => e.UserID).HasColumnName("UserID");

                entity.Property(e => e.UserIdentifier).HasMaxLength(35);
            });

        modelBuilder.Entity<PlayerSelectionView>(entity =>
        {
            entity.HasNoKey();

            entity.ToView("view_Team");

            entity.Property(e => e.FirstName).HasMaxLength(35);

            entity.Property(e => e.LastName).HasMaxLength(35);

            // entity.Property(e => e.PlayerID).HasColumnName("PlayerID");

            // entity.Property(e => e.TeamID).HasColumnName("TeamID");

            entity.Property(e => e.TeamName).HasMaxLength(35);


        });

        //Win Chance View

        modelBuilder.Entity<WinChanceView>(entity =>
        {
            entity.HasNoKey();

            entity.ToView("view_WinChance");

            entity.Property(e => e.TeamID).HasMaxLength(35);

            entity.Property(e => e.TeamName).HasMaxLength(35);

            entity.Property(e => e.WinChance).HasMaxLength(35);

            entity.Property(e => e.UserIdentifier).HasColumnName("UserIdentifier");

            entity.Property(e => e.UserIdentifier).HasMaxLength(35);
            
        });

    }
}
