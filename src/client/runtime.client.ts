// Client Runtime Entry Point

import { StateController } from "./controllers/state-controller";
import { UIController } from "./controllers/ui-controller";

// Initialize controllers
const stateController = new StateController();
const uiController = new UIController();

stateController.start();
uiController.start();

print("[Client] Started");
