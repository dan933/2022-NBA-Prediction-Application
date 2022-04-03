using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using nba_api_dotnet.models.players;
using nba_api_dotnet.models;
using nba_api_dotnet.models.Teams;

namespace nba_api_dotnet.Controllers;

[ApiController]
[Route("api/team")]
public class TeamController : ControllerBase
{
    private readonly NBAContext _context;

    public TeamController(NBAContext context)
    {
        _context = context;
    }

    // [HttpPost("AddGameResults")]
    // public int AddGameResults(GameResults gameResults) 
    //     {
    //         // the database returns the number of rows affected, should be 1
    //         int rows = _gameDB.SaveGameResults(gameResults);
    //         return rows;
    //     }

    
/// <summary>
    /// Creates a Team if the Team name does no
    /// </summary>
    /// <param name="team"></param>
    /// <returns>Team Created</returns>
    [HttpPost]
    [Route("create-team")]
    public async Task<ActionResult<Response<Team?>>> createTeam([FromBody] Team team){
        try{
            
            if(team.TeamName == null){
                 var response = new Response<Team?>(team, false, "Team Name cannot be Null");
                return Ok(response);   
            }
    
            //Check that team doesn't already exist in the database
            Team? Team = await _context.tbl_Teams!
            .Where(t => t.TeamName == team.TeamName)
            .FirstOrDefaultAsync();

            
            if (Team != null)
            {
                var response = new Response<Team?>(Team, false, "Team Already Exists");
                return Ok(response);
            }
            else{

                await _context.tbl_Teams!.AddAsync(team);
                await _context.SaveChangesAsync();

                var response = new Response<Team>(team, true, "Team successfully created");
                return Ok(response);
            }

        }
        catch(Exception ex){
            return StatusCode(500, ex);
        }

    }
    

/// <summary>
    /// Gets a List of all the teams in the database
    /// </summary>
    /// <returns>A list of Teams</returns>
    [HttpGet]
    [Route("get-all")]
    //public async Task<ActionResult<Response<List<Player>>>> getPlayers(){
    public async Task<ActionResult<List<Team>>> getAllTeams(){
        try{
            List<Team> teams = await _context.tbl_Teams!.ToListAsync();

            return Ok(teams);
        }
        catch(Exception ex){
            return StatusCode(500, ex);
        }

    }
}
