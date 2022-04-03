using System.Text.Json.Serialization;
using nba_api_dotnet;

namespace nba_api_dotnet.models.Teams;


public class Team
{    
    public Team()
    {
        
    }
    
    [JsonPropertyName("TeamID")]
    public int TeamID { get; set; }

    [JsonPropertyName("TeamName")]
    public string? TeamName { get; set; }
}