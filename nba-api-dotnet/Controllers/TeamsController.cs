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

    /// <summary>
    /// Creates a Team if the Team name does no
    /// </summary>
    /// <param name="team"></param>
    /// <returns>Team Created</returns>
    [HttpPost]
    [Route("create-team")]
    public async Task<ActionResult<Response<Team?>>> createTeam([FromBody] Team team)
    {
        try
        {
            if (team.TeamName is string){
                team.TeamName = team.TeamName.TrimStart();
            } 

            if (team.TeamName == null || team.TeamName == "")
            {
                var response = new Response<Team?>(team, false, "Team Name cannot be Null");
                return StatusCode(409,response);
            }

            //Check that team doesn't already exist in the database
            Team? isTeam = await _context.tbl_Teams
            .Where(t => t.TeamName == team.TeamName)
            .FirstOrDefaultAsync();


            if (isTeam != null)
            {
                var response = new Response<Team?>(isTeam, false, "Team Already Exists");
                return StatusCode(409,response);
            }
            else
            {
                await _context.tbl_Teams.AddAsync(team);
                await _context.SaveChangesAsync();

                var response = new Response<Team>(team, true, "Team successfully created");
                return Ok(response);
            }

        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.ToString());
        }

    }


    /// <summary>
    /// Gets a List of all the teams in the database
    /// </summary>
    /// <returns>A list of Teams</returns>
    [HttpGet]
    [Route("get-all")]
    public async Task<ActionResult<List<Team>>> getAllTeams()
    {
        try
        {
            List<Team> teams = await _context.tbl_Teams.ToListAsync();

            return Ok(teams);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.ToString());
        }

    }

    /// <summary>
    /// Get Players on a specific team
    /// </summary>
    /// <returns>The list of players are on a specific team</returns>
    [HttpGet]
    [Route("{teamID:int}/get-players")]
    public async Task<ActionResult<Response<List<PlayerSelectionView?>>>> GetTeamPlayers()
    {
        try
        {
            var teamID = Convert.ToInt32(RouteData.Values["teamID"]);

            //check to see if team exists
            var isTeam = await _context.tbl_Teams
            .FindAsync(teamID);

            // If the team doesn't exist 
            if(isTeam == null){
                var response = new Response<PlayerSelectionView?>(null, false, "This Team does not exist");

                return StatusCode(409,response);
            }else{

                var players = await _context.view_Team.ToListAsync();

                var response = new Response<List<PlayerSelectionView>>(players, true, "Players Successfully returned");

                return Ok(response);
            }

        }
        catch (Exception ex)
        {

            return StatusCode(500, ex.ToString());
        }
        
    }

    /// <summary>
    /// Adds Players to a existing team
    /// </summary>
    /// <param name="playerIDList"></param>
    /// <returns>The list of players that have been added to a team</returns>
    [HttpPost]
    [Route("{teamID:int}/addPlayers")]
    public async Task<ActionResult<Response<List<PlayerSelection?>>>> AddPlayersToTeam([FromBody] List<int?> playerIDList)
    {
        try
        {
            var teamID = Convert.ToInt32(RouteData.Values["teamID"]);

            //check to see if team exists
            var isTeam = await _context.tbl_Teams
            .FindAsync(teamID);

            // If the team doesn't exist 
            if(isTeam == null){
                var response = new Response<Team?>(null, false, "This Team does not exist");

                return StatusCode(409,response);
            }

            //Check to see that player exists
            var isPlayerExist = await _context.tbl_Players
            .Where(t => playerIDList.Contains(t.PlayerID))
            .FirstOrDefaultAsync();

            if(isPlayerExist == null){
                var response = new Response<Player?>(null, false, "Players in the list do not exist!!!");

                return StatusCode(409,response);
            }

            //Check to see if any player is already on the team
            var PlayersOnTeam = await _context.view_Team
            .Where(t => t.TeamID == teamID)
            .Where(t => playerIDList.Contains(t.PlayerID))
            .Select(c => new PlayerDetails(c.PlayerID, c.FirstName,c.LastName))
            .FirstOrDefaultAsync();

            //If Player is Already on the team
            if(PlayersOnTeam != null){
                var response = new Response<PlayerDetails>(PlayersOnTeam, false, "There are players that are already on the Team!!!");

                return StatusCode(409,response);
            }else{

                //Add Players to team
                playerIDList.ForEach(p =>
                {
                    var newPlayer = new PlayerSelection(p,teamID);
                    _context.tbl_PlayerSelection.AddAsync(newPlayer);
                    
                });
                await _context.SaveChangesAsync();

                var addedPlayers = (IEnumerable<PlayerDetails>) await _context.view_Team
                .Where(pv => playerIDList.Contains(pv.PlayerID))
                .Select(ps => new PlayerDetails(ps.PlayerID,ps.FirstName,ps.LastName))
                .ToListAsync();

                var response = new Response<IEnumerable<PlayerDetails>>(addedPlayers, true, "Players successfully Added");                

                return Ok(response);
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.ToString());
        }
    }

    [HttpDelete]
    [Route("{teamID:int}/RemovePlayers")]
    public async Task<ActionResult<Response<List<int?>>>> RemovePlayersFromTeam([FromBody] List<int?> playerIDList)
    {
        try
        {
            var teamID = Convert.ToInt32(RouteData.Values["teamID"]!);

            _context.tbl_PlayerSelection.RemoveRange(
                _context.tbl_PlayerSelection
                    .Where(t => t.TeamID == teamID)
                    .Where(t => playerIDList.Contains(t.PlayerID))
            );
                    
            await _context.SaveChangesAsync();

            // _context.tbl_PlayerSelection!.RemoveRange(players);


            var response = new Response<List<int?>>(playerIDList, true, "Players successfully Removed");

            return Ok(response);

        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.ToString());
        }
    }
}

//2730
//2772
//200746