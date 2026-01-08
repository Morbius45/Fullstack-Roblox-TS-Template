// Client Movement System
// Handles client-side movement prediction and interpolation

import { World } from "@rbxts/matter";
import { Transform, Velocity } from "shared/ecs";
import { ClientState } from "../world";

export function movementSystem(world: World, state: ClientState) {
  const deltaTime = state.deltaTime;

  // Update positions based on velocity
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
