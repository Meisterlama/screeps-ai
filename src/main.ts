import * as Roles from "./roles/roles";
import * as Spawner from "./spawner";
import { exportStats } from "./stats";

export function loop(): void {
  for (var room in Game.rooms) {
    Spawner.clearCreeps();
    Spawner.updatePop(room);
  }

  for (let name in Game.creeps) {
    var creep = Game.creeps[name];
    Roles.run(creep);
  }

  exportStats();
}
