import * as _ from "underscore";

export function trySpawnCreep(
  role: string,
  attributes: BodyPartConstant[],
  max: number,
  spawnerId: string
): boolean {
  if (!Game.spawns[spawnerId].spawning) {
    var roleCount = _.filter(
      Game.creeps,
      (creep: Creep) => creep.memory.role == role
    );
    if (roleCount.length < max) {
      if (
        Game.spawns[spawnerId].spawnCreep(attributes, `${role}-${Game.time}`, {
          dryRun: true
        }) === 0
      ) {
        Game.spawns[spawnerId].spawnCreep(attributes, `${role}-${Game.time}`, {
          memory: { role: role }
        });
        return true;
      }
    }
  }
  return false;
}
