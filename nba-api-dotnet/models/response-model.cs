using System.Text.Json.Serialization;

namespace nba_api_dotnet.models;


public class Response
{    
    public Response()
    {
        
    }
    
    [JsonPropertyName("Success")]
    public bool Sueccess { get; set; }

    [JsonPropertyName("Message")]
    public string? Message { get; set; }

    
}