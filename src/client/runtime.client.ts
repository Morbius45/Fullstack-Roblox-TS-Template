// Client Runtime Entry Point

import { StateController } from "./controllers/state-controller";
import { UIController } from "./controllers/ui-controller";
import { startClientWorld } from "./ecs";

// Initialize controllers
const stateController = new StateController();
const uiController = new UIController();

stateController.start();
uiController.start();

// Start the Matter ECS world
startClientWorld();

print("[Client] Started");
