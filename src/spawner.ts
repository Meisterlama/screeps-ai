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

export function clearCreeps(): void {
  for (let name in Memory.creeps) {
    console.log("clearing creeps");
    delete Memory.creeps[name];
  }
}

export function updatePop(roomId: string): void {
  var controller = Game.rooms[roomId].controller;
  var controllerLevel = 0;
  if (controller) controllerLevel = controller.level;
  for (var spawner in Game.spawns) {
    switch (controllerLevel) {
      case 2:
        trySpawnCreep("harvester", [WORK, WORK, CARRY, MOVE], 6, spawner);
        trySpawnCreep("builder", [WORK, CARRY, MOVE], 3, spawner);
      case 1:
        trySpawnCreep("harvester", [WORK, CARRY, MOVE], 3, spawner);
        trySpawnCreep("upgrader", [WORK, CARRY, MOVE], 2, spawner);
        break;

      default:
        break;
    }
  }
}
