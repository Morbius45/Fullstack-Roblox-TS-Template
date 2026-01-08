// Server Runtime Entry Point

import { Players } from "@rbxts/services";
import { DataService } from "./services/data-service";
import { startServerWorld } from "./ecs";

// Initialize services
const dataService = new DataService();
dataService.start();

// Start the Matter ECS world
startServerWorld();

print("[Server] Started");
print(
  `[Server] Waiting for players... (${Players.GetPlayers().size()} connected)`
);
