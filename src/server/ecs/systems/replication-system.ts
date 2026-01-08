// Server Replication System
// Handles replicating entity state to clients

import { World } from "@rbxts/matter";
import { Health, Replicated, Transform } from "shared/ecs";
import { ServerState } from "../world";

// Store previous state for delta compression
const previousState = new Map<
  number,
  {
    transform?: { position: Vector3; rotation: CFrame };
    health?: { current: number; max: number };
  }
>();

export function replicationSystem(world: World, state: ServerState) {
  // Track changes to replicated entities
  for (const [id, replicated, transform] of world.query(
    Replicated,
    Transform
  )) {
    const prev = previousState.get(id);

    // Check if transform changed
    if (
      !prev ||
      !prev.transform ||
      !transform.position.FuzzyEq(prev.transform.position, 0.01)
    ) {
      // Here you would send the update to clients via remotes
      // Example: ReplicateTransform.fireAllClients(replicated.id, transform);

      // Update previous state
      previousState.set(id, {
        ...prev,
        transform: {
          position: transform.position,
          rotation: transform.rotation,
        },
      });
    }
  }

  // Track health changes for replicated entities
  for (const [id, record] of world.queryChanged(Health)) {
    if (record.new) {
      const replicated = world.get(id, Replicated);
      if (replicated) {
        // Here you would send the update to clients via remotes
        // Example: ReplicateHealth.fireAllClients(replicated.id, record.new);
      }
    }
  }

  // Clean up despawned entities
  for (const [id, record] of world.queryChanged(Replicated)) {
    if (!record.new && record.old) {
      // Entity was despawned
      previousState.delete(id);
      // Here you would notify clients
      // Example: DespawnEntity.fireAllClients(record.old.id);
    }
  }
}
