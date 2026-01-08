// Client Matter World
// Sets up and manages the client-side ECS world

import { Debugger, Loop, World } from "@rbxts/matter";
import { RunService, UserInputService } from "@rbxts/services";
import { movementSystem, renderSystem } from "./systems";

// Create the client world
export const clientWorld = new World();

// State passed to all systems
export interface ClientState {
  deltaTime: number;
}

const state: ClientState = {
  deltaTime: 0,
};

// Create the debugger (can be toggled in development)
const debugger_ = new Debugger(clientWorld);

// Define the system execution order
const systems = [movementSystem, renderSystem];

// Create the game loop
const loop = new Loop(clientWorld, state, debugger_);

// Schedule all systems
loop.scheduleSystems(systems);

// Track if the world has been started
let started = false;

/**
 * Starts the client ECS world
 * Connects the loop to RunService events
 */
export function startClientWorld() {
  if (started) {
    warn("[Client ECS] World already started");
    return;
  }

  started = true;

  // Connect to RenderStepped for rendering systems
  // Connect to Heartbeat for game logic systems
  loop.begin({
    default: RunService.Heartbeat,
  });

  // Setup debugger toggle (press F4)
  UserInputService.InputBegan.Connect((input, processed) => {
    if (processed) return;
    if (input.KeyCode === Enum.KeyCode.F4) {
      debugger_.toggle();
    }
  });

  print("[Client ECS] World started");
}

/**
 * Gets the client world instance
 */
export function getClientWorld() {
  return clientWorld;
}

/**
 * Toggles the Matter debugger UI
 */
export function toggleDebugger() {
  debugger_.toggle();
}
