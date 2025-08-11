using BeverGang.Api.Services;
using BeverGang.Api.Models;

// Simple test runner for Bever Gang game logic
Console.WriteLine("🧪 Running Bever Gang Game Tests...\n");

var gameService = new GameService();

try
{
    // Test 1: Create Game
    Console.WriteLine("Testing game creation...");
    var playerNames = new List<string> { "Alice", "Bob" };
    var game = gameService.CreateGame(playerNames);
    
    if (game.Players.Count != 2)
        throw new Exception("Game should have 2 players");
    
    if (game.Phase != GamePhase.Playing)
        throw new Exception("Game should be in Playing phase");
    
    if (game.AvailableDamCards.Count == 0)
        throw new Exception("Game should have available dam cards");
    
    Console.WriteLine("✅ Game creation test passed");

    // Test 2: Roll dice and collect resource
    Console.WriteLine("Testing dice roll and resource collection...");
    var playerId = game.Players[0].Id;
    var initialPosition = game.Players[0].Position;
    
    var gameAfterRoll = gameService.RollDice(game.GameId, playerId);
    var playerAfterRoll = gameAfterRoll.Players[0];
    
    var gameAfterCollect = gameService.CollectResource(game.GameId, playerId);
    var playerAfterCollect = gameAfterCollect.Players[0];
    
    var totalResources = playerAfterCollect.Resources.Values.Sum();
    if (totalResources == 0)
        throw new Exception("Player should have collected at least one resource");
    
    Console.WriteLine("✅ Dice roll and resource collection test passed");

    // Test 3: Build dam
    Console.WriteLine("Testing dam building...");
    var player = gameAfterCollect.Players[0];
    player.Resources[ResourceType.Wood] = 5; // Give enough resources
    
    var smallestDam = gameAfterCollect.AvailableDamCards
        .OrderBy(d => d.Cost.Values.Sum())
        .First();
    
    var gameAfterBuild = gameService.BuildDam(game.GameId, playerId, smallestDam.Id);
    var playerAfterBuild = gameAfterBuild.Players[0];
    
    if (playerAfterBuild.Score == 0)
        throw new Exception("Player should have scored points for building dam");
    
    if (playerAfterBuild.DamCards.Count == 0)
        throw new Exception("Player should have the dam card");
    
    Console.WriteLine("✅ Dam building test passed");

    // Test 4: End turn
    Console.WriteLine("Testing turn ending...");
    var gameAfterEndTurn = gameService.EndTurn(game.GameId, playerId);
    
    if (gameAfterEndTurn.CurrentPlayerIndex != 1)
        throw new Exception("Current player index should have moved to next player");
    
    Console.WriteLine("✅ Turn ending test passed");

    Console.WriteLine("\n🎉 All tests passed! Bever Gang game is working correctly.");
    Console.WriteLine($"Game ID: {game.GameId}");
    Console.WriteLine($"Players: {string.Join(", ", game.Players.Select(p => p.Name))}");
    Console.WriteLine($"Available Dam Cards: {game.AvailableDamCards.Count}");
    Console.WriteLine($"Question Cards: {game.QuestionDeck.Count}");
}
catch (Exception ex)
{
    Console.WriteLine($"\n❌ Test failed: {ex.Message}");
    Environment.Exit(1);
}
