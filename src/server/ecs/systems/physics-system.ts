// Server Physics System
// Handles server-authoritative physics simulation

import { World } from "@rbxts/matter";
import { Transform, Velocity } from "shared/ecs";
import { ServerState } from "../world";

export function physicsSystem(world: World, state: ServerState) {
  const deltaTime = state.deltaTime;

  // Update positions based on velocity (server-authoritative)
  for (const [id, transform, velocity] of world.query(Transform, Velocity)) {
    const newPosition = transform.position.add(velocity.linear.mul(deltaTime));
    const newRotation = transform.rotation.mul(
      CFrame.Angles(
        velocity.angular.X * deltaTime,
        velocity.angular.Y * deltaTime,
        velocity.angular.Z * deltaTime
      )
    );

    world.insert(
      id,
      Transform({
        position: newPosition,
        rotation: newRotation,
      })
    );
  }
}
