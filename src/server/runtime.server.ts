// Server Runtime Entry Point

import { Players } from "@rbxts/services";
import { DataService } from "./services/data-service";

// Initialize services
const dataService = new DataService();
dataService.start();

print("[Server] Started");
print(`[Server] Waiting for players... (${Players.GetPlayers().size()} connected)`);
