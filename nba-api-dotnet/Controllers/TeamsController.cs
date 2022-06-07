using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using nba_api_dotnet.models.players;
using nba_api_dotnet.models;
using nba_api_dotnet.models.Teams;
using Microsoft.AspNetCore.Authorization;

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
    [Authorize]
    [Route("create-team")]
    public async Task<ActionResult<Response<Team?>>> createTeam([FromBody] Team team)
    {
        try
        {
            var sub = HttpContext?.User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            User? isUser = await _context.tbl_Users
            .Where(t => t.UserIdentifier == sub)
            .FirstOrDefaultAsync();

            if (isUser == null ) {
                var response = new Response<Team?>(new Team(), false, "This User Does Not Exist");

                return StatusCode(409, response);
            }

            team.UserId=isUser.UserID;

            if (team.TeamName is string)
            {
                team.TeamName = team.TeamName.TrimStart();
            }

            if (team.TeamName == null || team.TeamName == "")
            {
                var response = new Response<Team?>(team, false, "Team Name cannot be Null");
                return StatusCode(409, response);
            }

            //Check that team doesn't already exist in the database
            Team? isTeam = await _context.tbl_Teams
            .Where(t => t.TeamName == team.TeamName)
            .Where(t => t.UserId == isUser.UserID )
            .FirstOrDefaultAsync();


            if (isTeam != null)
            {
                var response = new Response<Team?>(isTeam, false, "Team Already Exists");
                return StatusCode(409, response);
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


    // <summary>
    // Gets a List of all the teams in the database
    // </summary>
    // <returns>A list of Teams</returns>
    // [HttpGet]
    // [Authorize]
    // [Route("get-all")]
    // public async Task<ActionResult<List<Team>>> getAllTeams()
    // {
    //     try
    //     {
    //         List<Team> teams = await _context.tbl_Teams.ToListAsync();

    //         return Ok(teams);
    //     }
    //     catch (Exception ex)
    //     {
    //         return StatusCode(500, ex.ToString());
    //     }

    // }

    /// <summary>
    /// Get Players on a specific team
    /// </summary>
    /// <returns>The list of players are on a specific team</returns>
    [HttpGet]
    [Authorize]
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
            if (isTeam == null)
            {
                var response = new Response<PlayerSelectionView?>(null, false, "This Team does not exist");

                return StatusCode(409, response);
            }
            else
            {

                var players = await _context.view_Team.Where(t => t.TeamID == teamID).ToListAsync();

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
    [Authorize]
    [Route("{teamID:int}/addPlayers")]
    public async Task<ActionResult<Response<List<PlayerSelection?>>>> AddPlayersToTeam([FromBody] List<int?> playerIDList)
    {
        try
        {
            var sub = HttpContext?.User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            User? isUser = await _context.tbl_Users
            .Where(t => t.UserIdentifier == sub)
            .FirstOrDefaultAsync();
            if (isUser == null ) {
                var response = new Response<Team?>(null, false, "This User Does Not Exist");

                return StatusCode(409, response);
            }
            
            var teamID = Convert.ToInt32(RouteData.Values["teamID"]);

            //check to see if team exists
            var isTeam = await _context.tbl_Teams
            .FindAsync(teamID);

            // If the team doesn't exist 
            if (isTeam == null)
            {
                var response = new Response<Team?>(null, false, "This Team does not exist");

                return StatusCode(409, response);
            }

            if (isTeam.UserId != isUser.UserID)
            {
                var response = new Response<Team?>(null, false, "This Team is not assigned to this user");

                return StatusCode(409, response);
            }

            //Check to see that player exists
            var isPlayerExist = await _context.tbl_Players
            .Where(t => playerIDList.Contains(t.PlayerID))
            .FirstOrDefaultAsync();

            if (isPlayerExist == null)
            {
                var response = new Response<Player?>(null, false, "Players in the list do not exist!!!");

                return StatusCode(409, response);
            }

            //Check to see if any player is already on the team
            var PlayersOnTeam = await _context.view_Team
            .Where(t => t.TeamID == teamID)
            .Where(t => playerIDList.Contains(t.PlayerID))
            .Select(c => new PlayerDetails(c.PlayerID, c.FirstName, c.LastName))
            .FirstOrDefaultAsync();

            //If Player is Already on the team
            if (PlayersOnTeam != null)
            {
                var response = new Response<PlayerDetails>(PlayersOnTeam, false, "There are players that are already on the Team!!!");

                return StatusCode(409, response);
            }
            else
            {

                //Add Players to team
                playerIDList.ForEach(p =>
                {
                    var newPlayer = new PlayerSelection(p, teamID);
                    _context.tbl_PlayerSelection.AddAsync(newPlayer);

                });
                await _context.SaveChangesAsync();

                var addedPlayers = (IEnumerable<PlayerDetails>)await _context.view_Team
                .Where(pv => playerIDList.Contains(pv.PlayerID))
                .Select(ps => new PlayerDetails(ps.PlayerID, ps.FirstName, ps.LastName))
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
    [Authorize]
    [Route("{teamID:int}/removePlayers")]
    public async Task<ActionResult<Response<List<int?>>>> RemovePlayersFromTeam([FromBody] List<int?> playerIDList)
    {
        try
        {
            var response = new Response<List<int?>>();
            var sub = HttpContext?.User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            User? isUser = await _context.tbl_Users
            .Where(t => t.UserIdentifier == sub)
            .FirstOrDefaultAsync();
            if (isUser == null ) {
                response = new Response<List<int?>>(new List<int?>(), false, "This User Does Not Exist");

                return StatusCode(409, response);
            }
            var teamID = Convert.ToInt32(RouteData.Values["teamID"]!);
            

            //check to see if team exists
            var isTeam = await _context.tbl_Teams
            .FindAsync(teamID);

            // If the team doesn't exist 
            if (isTeam == null)
            {
                response = new Response<List<int?>>(new List<int?>(), false, "This Team does not exist");

                return StatusCode(409, response);
            }

            if (isTeam.UserId != isUser.UserID)
            {
                response = new Response<List<int?>>(new List<int?>(), false, "This Team is not assigned to this user");

                return StatusCode(409, response);
            }

            // check to see all players are on team
            var unmatchedPlayers = new List<int?>();

            foreach (var player in playerIDList)
            {
                // Check to see if player is already on the team
                var PlayersOnTeam = await _context.view_Team
                .Where(t => t.TeamID == teamID)
                .Where(t => t.PlayerID == player)
                .Select(c => new PlayerDetails(c.PlayerID, c.FirstName, c.LastName))
                .FirstOrDefaultAsync();

                // if not on team, add to unmatched player list
                if (PlayersOnTeam == null)
                {
                    unmatchedPlayers.Add(player);
                }

            }

            // if any players not on team
            if (unmatchedPlayers.Count > 0)
            {
                response = new Response<List<int?>>(unmatchedPlayers, false, "Players not on team");

                return StatusCode(409, response);
            }

            // if team exists and all players to delete are on team, do so
            _context.tbl_PlayerSelection.RemoveRange(
                _context.tbl_PlayerSelection
                    .Where(t => t.TeamID == teamID)
                    .Where(t => playerIDList.Contains(t.PlayerID))
            );

            await _context.SaveChangesAsync();

            // _context.tbl_PlayerSelection!.RemoveRange(players);

            response = new Response<List<int?>>(playerIDList, true, "Players successfully Removed");

            return Ok(response);

        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.ToString());
        }
    }
    [HttpDelete]
    [Authorize]
    [Route("{teamID:int}/removeTeams")]
    public async Task<ActionResult<Response<int>>> RemoveTeams()
    {
        try
        {
           
            var teamID = Convert.ToInt32(RouteData.Values["teamID"]!);
            var response = new Response<int>();
            
            var sub = HttpContext?.User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            User? isUser = await _context.tbl_Users
            .Where(t => t.UserIdentifier == sub)
            .FirstOrDefaultAsync();
            if (isUser == null ) {
                response = new Response<int>(0, false, "This User Does Not Exist");

                return StatusCode(409, response);
            }

            //check to see if team exists
            var isTeam = await _context.tbl_Teams
            .FindAsync(teamID);

            // If the team doesn't exist 
            if (isTeam == null)
            {
                response = new Response<int>(0, false, "This Team does not exist");

                return StatusCode(409, response);
            }

             if (isTeam.UserId != isUser.UserID)
            {
                response = new Response<int>(0, false, "This Team is not assigned to this user");

                return StatusCode(409, response);
            }

            // if team exists and all players to delete are on team, do so
            _context.tbl_PlayerSelection.RemoveRange(
                _context.tbl_PlayerSelection
                    .Where(t => t.TeamID == teamID)
            );

            _context.tbl_Teams.RemoveRange(
               _context.tbl_Teams
               .Where(t => t.TeamID == teamID)
            );
            await _context.SaveChangesAsync();

            // _context.tbl_PlayerSelection!.RemoveRange(players);

            response = new Response<int>(teamID, true, "Team Successfully Removed");

            return Ok(response);

        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.ToString());
        }
    }

    // Get the team win percentage

    [HttpGet]
    [Authorize]
    [Route("get-winrate")]
    public async Task<ActionResult<Response<List<WinChanceView?>>>> GetWinChance()
    {
        
        try
        {
            var response = new Response<List<WinChanceView>>();
            var sub = HttpContext?.User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            User? isUser = await _context.tbl_Users
            .Where(t => t.UserIdentifier == sub)
            .FirstOrDefaultAsync();

            if(isUser == null){
                User UserToAdd = new User();
                UserToAdd.UserIdentifier=sub;
                await _context.tbl_Users.AddAsync(UserToAdd);
                await _context.SaveChangesAsync();

                isUser = await _context.tbl_Users
                .Where(t => t.UserIdentifier == sub)
                .FirstOrDefaultAsync();
            }
            
            var teams = await _context.view_WinChance.Where(t => t.UserID == isUser.UserID).ToListAsync();

            response = new Response<List<WinChanceView>>(teams, true, "Team Successfully returned");

            return Ok(response);

        }
        catch (Exception ex)
        {

            return StatusCode(500, ex.ToString());
        }

    }

    [HttpGet]
    [Authorize]
    [Route("{teamID:int}/{teamID2:int}/CompareWinChance")]
    public async Task<ActionResult<Response<List<WinChanceCompare?>>>> GetWinChanceCompare()
    {
        try
        {
            var teamID = Convert.ToInt32(RouteData.Values["teamID"]);

            //check to see if team exists
            var isTeam = await _context.tbl_Teams
            .FindAsync(teamID);

            var teamID2 = Convert.ToInt32(RouteData.Values["teamID2"]);

            //check to see if second team exists
            var isTeam2 = await _context.tbl_Teams
            .FindAsync(teamID2);


            //creates a list for the selected teams
            var teamMatchUpIdArray = new List<int> { teamID, teamID2 };

            // If the team doesn't exist 
            if (isTeam == null)
            {
                var response = new Response<WinChanceView?>(null, false, "Team 1 does not exist");

                return StatusCode(409, response);
            }
            else if (isTeam2 == null)
            {
                var response = new Response<WinChanceView?>(null, false, "Team 2 does not exist");

                return StatusCode(409, response);
            }
            else
            {
                
                
                var teamMatchUpObject = await _context.view_WinChance
                .Where(t => teamMatchUpIdArray.Contains(t.TeamID)).ToListAsync();

                decimal team1WinRate = teamMatchUpObject[0].WinChance;

                decimal team2WinRate = teamMatchUpObject[1].WinChance ;
               
                var teamMatchUpWinRates = new List<decimal> { team1WinRate, team2WinRate };

                decimal winTeamProbability;  
                if(teamMatchUpObject[0].WinChance == teamMatchUpObject[1].WinChance)
                {
                    winTeamProbability = 0;
                }
                else
                {
                    winTeamProbability = teamMatchUpWinRates.Max() / (team1WinRate + team2WinRate);
                }


                string? winningTeam;
                if (teamMatchUpObject[0].WinChance == teamMatchUpWinRates.Max())
                {
                    winningTeam = teamMatchUpObject[0].TeamName;
                }
                else
                {
                    winningTeam = teamMatchUpObject[1].TeamName;
                }


                string? losingTeam;
                if (teamMatchUpObject[0].WinChance != teamMatchUpWinRates.Max())
                {
                    losingTeam = teamMatchUpObject[0].TeamName;
                }
                else
                {
                    losingTeam = teamMatchUpObject[1].TeamName;
                }


                Boolean isDraw;
                if (team1WinRate==team2WinRate)
                {
                    isDraw = true;
                }
                else
                {
                    isDraw = false;
                }

                // var responseData = (winningTeam, winTeamProbability, isDraw);

                // var response = new Response<List<WinChanceCompare>>(responseData, true, "Winning Team Details Successfully Returned");


                return Ok (new {winningTeam, losingTeam, winTeamProbability, isDraw});
            }
        }
        catch (Exception ex)
        {

            return StatusCode(500, ex.ToString());
        }

    }

}









// remove team







//2730
//2772
//200746
