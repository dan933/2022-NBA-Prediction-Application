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
    public virtual DbSet<PlayerSelectionView> view_Team { get; set; } = null!;

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        // connect to sql server with connection string from app settings
        options.UseSqlServer(Configuration.GetConnectionString("DanDesktopDB"));
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

            entity.HasIndex(e => e.TeamName, "AK_TeamName")
            .IsUnique();

            // entity.Property(e => e.TeamID).HasColumnName("TeamID");

            entity.Property(e => e.TeamName).HasMaxLength(35);
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

    }



}