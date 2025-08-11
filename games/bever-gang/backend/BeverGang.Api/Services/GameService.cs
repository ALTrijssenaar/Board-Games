using BeverGang.Api.Models;

namespace BeverGang.Api.Services
{
    public interface IGameService
    {
        GameState CreateGame(List<string> playerNames);
        GameState? GetGame(string gameId);
        GameState AddPlayer(string gameId, string playerName);
        GameState RollDice(string gameId, string playerId);
        GameState CollectResource(string gameId, string playerId);
        GameState BuildDam(string gameId, string playerId, string damCardId);
        GameState AnswerQuestion(string gameId, string playerId, int answerIndex);
        GameState EndTurn(string gameId, string playerId);
        List<GameState> GetActiveGames();
    }

    public class GameService : IGameService
    {
        private readonly Dictionary<string, GameState> _games = new();
        private readonly Random _random = new();

        public GameState CreateGame(List<string> playerNames)
        {
            var gameId = Guid.NewGuid().ToString();
            var players = playerNames.Select(name => new Player
            {
                Id = Guid.NewGuid().ToString(),
                Name = name
            }).ToList();

            var gameState = new GameState
            {
                GameId = gameId,
                Players = players,
                Phase = GamePhase.Setup,
                AvailableDamCards = GenerateDamCards(),
                QuestionDeck = GenerateQuestionCards()
            };

            _games[gameId] = gameState;
            
            if (players.Count >= 2)
            {
                gameState.Phase = GamePhase.Playing;
            }

            return gameState;
        }

        public GameState? GetGame(string gameId)
        {
            _games.TryGetValue(gameId, out var game);
            return game;
        }

        public GameState AddPlayer(string gameId, string playerName)
        {
            if (!_games.TryGetValue(gameId, out var game))
                throw new ArgumentException("Game not found");

            if (game.Phase != GamePhase.Setup)
                throw new InvalidOperationException("Cannot add players to a game in progress");

            if (game.Players.Count >= 4)
                throw new InvalidOperationException("Game is full");

            var newPlayer = new Player
            {
                Id = Guid.NewGuid().ToString(),
                Name = playerName
            };

            game.Players.Add(newPlayer);

            if (game.Players.Count >= 2)
            {
                game.Phase = GamePhase.Playing;
            }

            return game;
        }

        public GameState RollDice(string gameId, string playerId)
        {
            if (!_games.TryGetValue(gameId, out var game))
                throw new ArgumentException("Game not found");

            var currentPlayer = game.Players[game.CurrentPlayerIndex];
            if (currentPlayer.Id != playerId)
                throw new InvalidOperationException("Not your turn");

            // Roll dice (1-6)
            var diceRoll = _random.Next(1, 7);
            
            // Move player
            currentPlayer.Position = (currentPlayer.Position + diceRoll) % 20; // Assume 20 board spaces

            return game;
        }

        public GameState CollectResource(string gameId, string playerId)
        {
            if (!_games.TryGetValue(gameId, out var game))
                throw new ArgumentException("Game not found");

            var currentPlayer = game.Players[game.CurrentPlayerIndex];
            if (currentPlayer.Id != playerId)
                throw new InvalidOperationException("Not your turn");

            // Determine resource based on position
            var resourceType = GetResourceTypeForPosition(currentPlayer.Position);
            currentPlayer.Resources[resourceType]++;

            return game;
        }

        public GameState BuildDam(string gameId, string playerId, string damCardId)
        {
            if (!_games.TryGetValue(gameId, out var game))
                throw new ArgumentException("Game not found");

            var currentPlayer = game.Players[game.CurrentPlayerIndex];
            if (currentPlayer.Id != playerId)
                throw new InvalidOperationException("Not your turn");

            var damCard = game.AvailableDamCards.FirstOrDefault(d => d.Id == damCardId);
            if (damCard == null)
                throw new ArgumentException("Dam card not found");

            // Check if player has enough resources
            foreach (var cost in damCard.Cost)
            {
                if (currentPlayer.Resources[cost.Key] < cost.Value)
                    throw new InvalidOperationException("Not enough resources");
            }

            // Deduct resources
            foreach (var cost in damCard.Cost)
            {
                currentPlayer.Resources[cost.Key] -= cost.Value;
            }

            // Add dam card to player and score
            currentPlayer.DamCards.Add(damCard);
            currentPlayer.Score += damCard.Points;
            game.AvailableDamCards.Remove(damCard);

            // Check win condition
            CheckWinCondition(game);

            return game;
        }

        public GameState AnswerQuestion(string gameId, string playerId, int answerIndex)
        {
            if (!_games.TryGetValue(gameId, out var game))
                throw new ArgumentException("Game not found");

            var currentPlayer = game.Players[game.CurrentPlayerIndex];
            if (currentPlayer.Id != playerId)
                throw new InvalidOperationException("Not your turn");

            if (game.QuestionDeck.Count == 0)
                throw new InvalidOperationException("No questions available");

            var question = game.QuestionDeck.First();
            game.QuestionDeck.RemoveAt(0);

            if (answerIndex == question.CorrectAnswerIndex)
            {
                currentPlayer.Score += question.BonusPoints;
            }

            return game;
        }

        public GameState EndTurn(string gameId, string playerId)
        {
            if (!_games.TryGetValue(gameId, out var game))
                throw new ArgumentException("Game not found");

            var currentPlayer = game.Players[game.CurrentPlayerIndex];
            if (currentPlayer.Id != playerId)
                throw new InvalidOperationException("Not your turn");

            // Move to next player
            game.CurrentPlayerIndex = (game.CurrentPlayerIndex + 1) % game.Players.Count;

            return game;
        }

        public List<GameState> GetActiveGames()
        {
            return _games.Values.Where(g => g.Phase != GamePhase.Finished).ToList();
        }

        private ResourceType GetResourceTypeForPosition(int position)
        {
            // Simple mapping: positions 0-6 = Wood, 7-13 = Stone, 14-19 = Food
            return position switch
            {
                <= 6 => ResourceType.Wood,
                <= 13 => ResourceType.Stone,
                _ => ResourceType.Food
            };
        }

        private List<DamCard> GenerateDamCards()
        {
            return new List<DamCard>
            {
                new() { Id = "dam1", Name = "Small Wooden Dam", Points = 3, Cost = new() { { ResourceType.Wood, 2 } } },
                new() { Id = "dam2", Name = "Stone Foundation", Points = 5, Cost = new() { { ResourceType.Stone, 3 } } },
                new() { Id = "dam3", Name = "Large Dam", Points = 8, Cost = new() { { ResourceType.Wood, 3 }, { ResourceType.Stone, 2 } } },
                new() { Id = "dam4", Name = "Reinforced Dam", Points = 10, Cost = new() { { ResourceType.Wood, 2 }, { ResourceType.Stone, 3 }, { ResourceType.Food, 1 } } },
                new() { Id = "dam5", Name = "Master Dam", Points = 15, Cost = new() { { ResourceType.Wood, 4 }, { ResourceType.Stone, 4 }, { ResourceType.Food, 2 } } }
            };
        }

        private List<QuestionCard> GenerateQuestionCards()
        {
            return new List<QuestionCard>
            {
                new() { Id = "q1", Question = "What do beavers use to build dams?", Options = new() { "Rocks", "Wood and mud", "Metal", "Plastic" }, CorrectAnswerIndex = 1, BonusPoints = 2 },
                new() { Id = "q2", Question = "How long can a beaver hold its breath underwater?", Options = new() { "30 seconds", "2 minutes", "15 minutes", "1 hour" }, CorrectAnswerIndex = 2, BonusPoints = 3 },
                new() { Id = "q3", Question = "What is a baby beaver called?", Options = new() { "Cub", "Kit", "Pup", "Calf" }, CorrectAnswerIndex = 1, BonusPoints = 2 },
                new() { Id = "q4", Question = "Why do beavers build dams?", Options = new() { "For fun", "To create deep water for protection", "To catch fish", "To store food" }, CorrectAnswerIndex = 1, BonusPoints = 3 }
            };
        }

        private void CheckWinCondition(GameState game)
        {
            const int winningScore = 25;
            var winner = game.Players.FirstOrDefault(p => p.Score >= winningScore);
            
            if (winner != null)
            {
                game.Winner = winner;
                game.Phase = GamePhase.Finished;
            }
        }
    }
}