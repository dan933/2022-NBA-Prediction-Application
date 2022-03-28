using System.Text.Json.Serialization;

namespace nba_api_dotnet.models.players;


public class Player
{    
    public Player()
    {
        
    }
    [JsonPropertyName("PlayerID")]
    public int PlayerID { get; set; }

    [JsonPropertyName("FirstName")]
    public string? FirstName { get; set; }

    [JsonPropertyName("LastName")]
    public string? LastName { get; set; }

    [JsonPropertyName("Wins")]
    public int Wins { get; set; }

    [JsonPropertyName("Losses")] 
    public int Losses { get; set; }

    [JsonPropertyName("PlayerWinPercentage")]
    public double PlayerWinPercentage { get; set; }

    [JsonPropertyName("Points")]
    public double Points { get; set; }

    [JsonPropertyName("Rebounds")]
    public double Rebounds { get; set; }

    [JsonPropertyName("Assists")]
    public double Assists { get; set; }

    [JsonPropertyName("Steals")]
    public double Steals { get; set; }

    [JsonPropertyName("Blocks")]
    public double Blocks { get; set; }

    [JsonPropertyName("MissedFieldGoals")]
    public double MissedFieldGoals { get; set; }

    [JsonPropertyName("MissedFreeThrows")]
    public double MissedFreeThrows { get; set; }

    [JsonPropertyName("TurnOvers")]
    public double TurnOvers { get; set; }
}