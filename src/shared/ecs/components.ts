// Matter ECS Components
// Define your ECS components here that are shared between client and server

import { component } from "@rbxts/matter";

// Example: Transform component for entities with position/rotation
export const Transform = component<{
  position: Vector3;
  rotation: CFrame;
}>("Transform");

// Example: Model component for entities with a physical model
export const Model = component<{
  model: Model;
}>("Model");

// Example: Health component for entities with health
export const Health = component<{
  current: number;
  max: number;
}>("Health");

// Example: Velocity component for moving entities
export const Velocity = component<{
  linear: Vector3;
  angular: Vector3;
}>("Velocity");

// Example: Player component to tag player-controlled entities
export const Player = component<{
  userId: number;
  player: Player;
}>("Player");

// Example: NPC component to tag non-player entities
export const NPC = component<{
  name: string;
  hostile: boolean;
}>("NPC");

// Example: Renderable component for client-side rendering
export const Renderable = component<{
  visible: boolean;
}>("Renderable");

// Example: Replicated component for server-authoritative entities
export const Replicated = component<{
  id: string;
}>("Replicated");
