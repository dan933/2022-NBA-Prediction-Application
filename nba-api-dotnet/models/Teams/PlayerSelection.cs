using System.Text.Json.Serialization;
using nba_api_dotnet.models.players;

namespace nba_api_dotnet.models.Teams;

public class PlayerSelection
{

    public PlayerSelection()
    {
        
    }

    public PlayerSelection(int? playerID, int? teamID)
    {
        this.PlayerID = playerID;
        this.TeamID = teamID;
        this.Player = null;
        this.Team = null;
    }

    [JsonPropertyName("PlayerSelectionID")]
    public int PlayerSelectionID { get; set; }
    
    [JsonPropertyName("PlayerID")]
    public int? PlayerID { get; set; }

    [JsonPropertyName("TeamID")]
    public int? TeamID { get; set; }

// These properties bellow are used to tell dbContext.cs which tables the foreign keys are from.
    public virtual Player? Player { get; set; }
    public virtual Team? Team { get; set; }
}
public class PlayerDetails
{   
    public PlayerDetails(int playerID, string? firstName, string? lastName)
    {
        this.PlayerID = playerID;
        this.FirstName = firstName;
        this.LastName = lastName;
    }
    
    [JsonPropertyName("PlayerID")]
    public int? PlayerID { get; set; }

    [JsonPropertyName("FirstName")]
    public string? FirstName { get; set; }

    [JsonPropertyName("LastName")]
    public string? LastName { get; set; }
}