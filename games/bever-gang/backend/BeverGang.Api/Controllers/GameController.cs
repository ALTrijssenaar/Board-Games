using Microsoft.AspNetCore.Mvc;
using BeverGang.Api.Models;
using BeverGang.Api.Services;

namespace BeverGang.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GameController : ControllerBase
    {
        private readonly IGameService _gameService;

        public GameController(IGameService gameService)
        {
            _gameService = gameService;
        }

        [HttpPost("create")]
        public ActionResult<GameState> CreateGame([FromBody] CreateGameRequest request)
        {
            try
            {
                var game = _gameService.CreateGame(request.PlayerNames);
                return Ok(game);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{gameId}")]
        public ActionResult<GameState> GetGame(string gameId)
        {
            var game = _gameService.GetGame(gameId);
            if (game == null)
                return NotFound("Game not found");
            
            return Ok(game);
        }

        [HttpPost("{gameId}/players")]
        public ActionResult<GameState> AddPlayer(string gameId, [FromBody] AddPlayerRequest request)
        {
            try
            {
                var game = _gameService.AddPlayer(gameId, request.PlayerName);
                return Ok(game);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("{gameId}/actions/roll-dice")]
        public ActionResult<GameState> RollDice(string gameId, [FromBody] PlayerActionRequest request)
        {
            try
            {
                var game = _gameService.RollDice(gameId, request.PlayerId);
                return Ok(game);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("{gameId}/actions/collect-resource")]
        public ActionResult<GameState> CollectResource(string gameId, [FromBody] PlayerActionRequest request)
        {
            try
            {
                var game = _gameService.CollectResource(gameId, request.PlayerId);
                return Ok(game);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("{gameId}/actions/build-dam")]
        public ActionResult<GameState> BuildDam(string gameId, [FromBody] BuildDamRequest request)
        {
            try
            {
                var game = _gameService.BuildDam(gameId, request.PlayerId, request.DamCardId);
                return Ok(game);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("{gameId}/actions/answer-question")]
        public ActionResult<GameState> AnswerQuestion(string gameId, [FromBody] AnswerQuestionRequest request)
        {
            try
            {
                var game = _gameService.AnswerQuestion(gameId, request.PlayerId, request.AnswerIndex);
                return Ok(game);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("{gameId}/actions/end-turn")]
        public ActionResult<GameState> EndTurn(string gameId, [FromBody] PlayerActionRequest request)
        {
            try
            {
                var game = _gameService.EndTurn(gameId, request.PlayerId);
                return Ok(game);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("active")]
        public ActionResult<List<GameState>> GetActiveGames()
        {
            var games = _gameService.GetActiveGames();
            return Ok(games);
        }
    }

    public class CreateGameRequest
    {
        public List<string> PlayerNames { get; set; } = new();
    }

    public class AddPlayerRequest
    {
        public string PlayerName { get; set; } = string.Empty;
    }

    public class PlayerActionRequest
    {
        public string PlayerId { get; set; } = string.Empty;
    }

    public class BuildDamRequest
    {
        public string PlayerId { get; set; } = string.Empty;
        public string DamCardId { get; set; } = string.Empty;
    }

    public class AnswerQuestionRequest
    {
        public string PlayerId { get; set; } = string.Empty;
        public int AnswerIndex { get; set; }
    }
}