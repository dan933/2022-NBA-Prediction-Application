using nba_api_dotnet;
using nba_api_dotnet.models.Teams;

namespace nba_api_dotnet
{
    public partial class User
    {
        public User()
        {
            Teams = new HashSet<Team>();
        }

        public int UserID { get; set; }
        public string? UserIdentifier { get; set; }

        public virtual ICollection<Team> Teams { get; set; }
    }
}