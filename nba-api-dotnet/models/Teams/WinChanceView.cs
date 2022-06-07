using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using nba_api_dotnet.models.players;
namespace nba_api_dotnet.models.Teams;

public class WinChanceView
{    
    public WinChanceView()
    {
        
    }

    [JsonPropertyName("TeamID")]
    public int TeamID { get; set; }
    [JsonPropertyName("TeamName")]
    public string? TeamName { get; set; }
    [JsonPropertyName("WinChance")]
    public decimal WinChance { get; set; }

    public int? UserID { get; set; }

    
}