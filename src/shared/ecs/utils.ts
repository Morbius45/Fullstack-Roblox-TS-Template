// Matter ECS Utilities
// Helper functions for working with the ECS

import { AnyEntity, World } from "@rbxts/matter";
import {
  Health,
  Model,
  NPC,
  Player,
  Replicated,
  Transform,
  Velocity,
} from "./components";
import { HttpService } from "@rbxts/services";

/**
 * Spawns a player entity with standard components
 */
export function spawnPlayerEntity(world: World, player: Player) {
  const character = player.Character;
  if (!character) {
    warn(`[ECS] Cannot spawn player entity: ${player.Name} has no character`);
    return undefined;
  }

  const rootPart = character.FindFirstChild("HumanoidRootPart") as
    | BasePart
    | undefined;
  if (!rootPart) {
    warn(
      `[ECS] Cannot spawn player entity: ${player.Name} has no HumanoidRootPart`
    );
    return undefined;
  }

  const humanoid = character.FindFirstChildOfClass("Humanoid");

  const entityId = world.spawn(
    Player({
      userId: player.UserId,
      player: player,
    }),
    Transform({
      position: rootPart.Position,
      rotation: rootPart.CFrame,
    }),
    Health({
      current: humanoid?.Health ?? 100,
      max: humanoid?.MaxHealth ?? 100,
    }),
    Replicated({
      id: HttpService.GenerateGUID(false),
    })
  );

  print(`[ECS] Spawned player entity ${entityId} for ${player.Name}`);
  return entityId;
}

/**
 * Spawns an NPC entity
 */
export function spawnNPCEntity(
  world: World,
  npcModel: Model,
  options: {
    name: string;
    hostile: boolean;
    health?: number;
    maxHealth?: number;
  }
) {
  const primaryPart = npcModel.PrimaryPart;
  if (!primaryPart) {
    warn("[ECS] Cannot spawn NPC entity: model has no PrimaryPart");
    return undefined;
  }

  const entityId = world.spawn(
    NPC({
      name: options.name,
      hostile: options.hostile,
    }),
    Model({
      model: npcModel,
    }),
    Transform({
      position: primaryPart.Position,
      rotation: primaryPart.CFrame,
    }),
    Health({
      current: options.health ?? 100,
      max: options.maxHealth ?? 100,
    }),
    Velocity({
      linear: Vector3.zero,
      angular: Vector3.zero,
    }),
    Replicated({
      id: HttpService.GenerateGUID(false),
    })
  );

  print(`[ECS] Spawned NPC entity ${entityId}: ${options.name}`);
  return entityId;
}

/**
 * Despawns an entity and cleans up its model if present
 */
export function despawnEntity(world: World, entityId: AnyEntity) {
  const modelComponent = world.get(entityId, Model);
  if (modelComponent) {
    modelComponent.model.Destroy();
  }

  world.despawn(entityId);
  print(`[ECS] Despawned entity ${entityId}`);
}

/**
 * Damages an entity
 */
export function damageEntity(
  world: World,
  entityId: AnyEntity,
  damage: number
) {
  const healthComponent = world.get(entityId, Health);
  if (!healthComponent) {
    warn(`[ECS] Cannot damage entity ${entityId}: no Health component`);
    return;
  }

  world.insert(
    entityId,
    Health({
      current: math.max(0, healthComponent.current - damage),
      max: healthComponent.max,
    })
  );
}

/**
 * Heals an entity
 */
export function healEntity(world: World, entityId: AnyEntity, amount: number) {
  const healthComponent = world.get(entityId, Health);
  if (!healthComponent) {
    warn(`[ECS] Cannot heal entity ${entityId}: no Health component`);
    return;
  }

  world.insert(
    entityId,
    Health({
      current: math.min(healthComponent.max, healthComponent.current + amount),
      max: healthComponent.max,
    })
  );
}
