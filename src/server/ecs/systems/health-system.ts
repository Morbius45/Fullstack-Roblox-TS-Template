// Server Health System
// Handles health-related logic (damage, healing, death)

import { World } from "@rbxts/matter";
import { Health, Model } from "shared/ecs";
import { ServerState } from "../world";

export function healthSystem(world: World, state: ServerState) {
  // Handle health changes
  for (const [id, record] of world.queryChanged(Health)) {
    if (record.new && record.old) {
      const health = record.new;
      const oldHealth = record.old;

      // Check for damage taken
      if (health.current < oldHealth.current) {
        const damage = oldHealth.current - health.current;
        print(`[Health] Entity ${id} took ${damage} damage`);
      }

      // Check for healing
      if (health.current > oldHealth.current) {
        const healed = health.current - oldHealth.current;
        print(`[Health] Entity ${id} healed for ${healed}`);
      }

      // Check for death
      if (health.current <= 0) {
        print(`[Health] Entity ${id} died`);

        // Clean up the entity's model
        const model = world.get(id, Model);
        if (model) {
          model.model.Destroy();
        }

        // Despawn the entity
        world.despawn(id);
      }
    }
  }

  // Clamp health to max
  for (const [id, health] of world.query(Health)) {
    if (health.current > health.max) {
      world.insert(
        id,
        Health({
          current: health.max,
          max: health.max,
        })
      );
    }
  }
}
