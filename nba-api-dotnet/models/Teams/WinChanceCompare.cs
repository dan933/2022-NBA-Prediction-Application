using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using nba_api_dotnet.models.players;
namespace nba_api_dotnet.models.Teams;

public class WinChanceCompare
{    
    public WinChanceCompare()
    {
        
    }

    [JsonPropertyName("WinningTeam")]
    public string? WinningTeam { get; set; }
    [JsonPropertyName("LosingTeam")]
    public string? LosingTeam { get; set; }
    [JsonPropertyName("WinTeamProbability")]
    public decimal WinTeamProbability { get; set; }
    [JsonPropertyName("IsDraw")]
    public Boolean IsDraw { get; set; }

    
}