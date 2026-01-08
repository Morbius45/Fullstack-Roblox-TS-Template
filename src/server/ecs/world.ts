// Server Matter World
// Sets up and manages the server-side ECS world

import { Loop, World } from "@rbxts/matter";
import { RunService } from "@rbxts/services";
import { healthSystem, physicsSystem, replicationSystem } from "./systems";

// Create the server world
export const serverWorld = new World();

// State passed to all systems
export interface ServerState {
  deltaTime: number;
}

const state: ServerState = {
  deltaTime: 0,
};

// Define the system execution order
// Order matters! Physics should run before replication
const systems = [physicsSystem, healthSystem, replicationSystem];

// Create the game loop
const loop = new Loop(serverWorld, state);

// Schedule all systems
loop.scheduleSystems(systems);

// Track if the world has been started
let started = false;

/**
 * Starts the server ECS world
 * Connects the loop to RunService.Heartbeat
 */
export function startServerWorld() {
  if (started) {
    warn("[Server ECS] World already started");
    return;
  }

  started = true;

  // Connect to Heartbeat for server game logic
  loop.begin({
    default: RunService.Heartbeat,
  });

  print("[Server ECS] World started");
}

/**
 * Gets the server world instance
 */
export function getServerWorld() {
  return serverWorld;
}
