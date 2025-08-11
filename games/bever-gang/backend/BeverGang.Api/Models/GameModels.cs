namespace BeverGang.Api.Models
{
    public enum ResourceType
    {
        Wood,
        Stone,
        Food
    }

    public class GameResource
    {
        public ResourceType Type { get; set; }
        public int Amount { get; set; }
    }

    public class Player
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public int Position { get; set; } = 0;
        public Dictionary<ResourceType, int> Resources { get; set; } = new()
        {
            { ResourceType.Wood, 0 },
            { ResourceType.Stone, 0 },
            { ResourceType.Food, 0 }
        };
        public int Score { get; set; } = 0;
        public List<DamCard> DamCards { get; set; } = new();
    }

    public class DamCard
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public int Points { get; set; }
        public Dictionary<ResourceType, int> Cost { get; set; } = new();
    }

    public class QuestionCard
    {
        public string Id { get; set; } = string.Empty;
        public string Question { get; set; } = string.Empty;
        public List<string> Options { get; set; } = new();
        public int CorrectAnswerIndex { get; set; }
        public int BonusPoints { get; set; }
    }

    public class GameState
    {
        public string GameId { get; set; } = string.Empty;
        public List<Player> Players { get; set; } = new();
        public int CurrentPlayerIndex { get; set; } = 0;
        public GamePhase Phase { get; set; } = GamePhase.Setup;
        public List<DamCard> AvailableDamCards { get; set; } = new();
        public List<QuestionCard> QuestionDeck { get; set; } = new();
        public Player? Winner { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public enum GamePhase
    {
        Setup,
        Playing,
        Finished
    }

    public class GameAction
    {
        public string PlayerId { get; set; } = string.Empty;
        public ActionType Type { get; set; }
        public Dictionary<string, object> Parameters { get; set; } = new();
    }

    public enum ActionType
    {
        RollDice,
        CollectResource,
        BuildDam,
        AnswerQuestion,
        EndTurn
    }
}