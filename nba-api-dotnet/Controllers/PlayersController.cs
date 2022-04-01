using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using nba_api_dotnet.models.players;
using nba_api_dotnet.models;

namespace nba_api_dotnet.Controllers;

[ApiController]
[Route("players")]
public class PlayersController : ControllerBase
{
    private readonly NBAContext _context;

    public PlayersController(NBAContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Gets a list of all the players in the database
    /// </summary>
    /// <returns>Object if found</returns>
    [HttpGet]
    [Route("get-all")]
    public async Task<ActionResult<List<Player>>> getPlayers(){
        try{
            List<Player> players = await _context.tbl_Players.ToListAsync();

        return Ok(players);
        }
        catch(Exception ex){
            return StatusCode(500, ex);
        }

    }
}
