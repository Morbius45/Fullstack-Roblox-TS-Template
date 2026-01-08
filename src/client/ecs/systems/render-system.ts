// Client Render System
// Handles rendering and visual updates for entities

import { World } from "@rbxts/matter";
import { Model, Renderable, Transform } from "shared/ecs";
import { ClientState } from "../world";

export function renderSystem(world: World, state: ClientState) {
  // Handle newly added Renderable components
  for (const [id, record] of world.queryChanged(Renderable)) {
    if (record.new && !record.old) {
      // Component was just added
      const model = world.get(id, Model);
      if (model) {
        // Make model visible when Renderable is added
        for (const descendant of model.model.GetDescendants()) {
          if (descendant.IsA("BasePart")) {
            descendant.Transparency = record.new.visible ? 0 : 1;
          }
        }
      }
    }
  }

  // Update model positions based on Transform
  for (const [id, transform, model] of world.query(Transform, Model)) {
    if (model.model.PrimaryPart) {
      model.model.PrimaryPart.CFrame = transform.rotation.add(
        transform.position
      );
    }
  }
}
