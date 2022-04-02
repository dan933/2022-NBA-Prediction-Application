using System.Text.Json.Serialization;

namespace nba_api_dotnet.models;


public class Response<T>
{    
    public Response()
    {
        
    }
    public Response(T data, bool success, string message)
    {
        this.Data = data;
        this.Sueccess = success;
        this.Message = message;
    }

    [JsonPropertyName("Data")]
    public T? Data { get; set; }
    
    [JsonPropertyName("Success")]
    public bool Sueccess { get; set; }

    [JsonPropertyName("Message")]
    public string? Message { get; set; }

    
}