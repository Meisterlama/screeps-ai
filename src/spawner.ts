function trySpawnCreep(
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
          memory: { role: role, node: null }
        });
        return true;
      }
    }
  }
  return false;
}

export function clearCreeps(): void {
  for (let name in Memory.creeps) {
    if (!Game.creeps[name]) {
      if (Memory.creeps[name].role === "harvester") {
        Memory.nodes[Memory.creeps[name].node!.id] -= 1;
      }
      console.log(`clearing creep: ${name}`);
      delete Memory.creeps[name];
    }
  }
}

export function updatePop(roomId: string): void {
  var controller = Game.rooms[roomId].controller;
  var controllerLevel = 0;
  if (controller) controllerLevel = controller.level;
  for (var spawner in Game.spawns) {
    switch (controllerLevel) {
      case 2:
        if (
          trySpawnCreep(
            "builder",
            [WORK, CARRY, CARRY, MOVE, MOVE],
            2 * controllerLevel,
            spawner
          )
        )
          break;
        if (trySpawnCreep("pillager", [CARRY, CARRY, MOVE, MOVE], 0, spawner))
          break;
      case 1:
        if (
          trySpawnCreep(
            "harvester",
            [WORK, CARRY, CARRY, MOVE, MOVE],
            3 * controllerLevel,
            spawner
          )
        )
          break;
        if (
          trySpawnCreep(
            "upgrader",
            [WORK, CARRY, CARRY, MOVE, MOVE],
            2 * controllerLevel,
            spawner
          )
        )
          break;
        break;

      default:
        break;
    }
  }
}

// function countFlag(type: string): number {
//   switch (type) {
//     case "pillage":
//       return _.filter(Game.flags, (flag: Flag) => {
//         flag.color === COLOR_ORANGE ? true : false;
//         return false;
//       });
//       break;
//
//     default:
//       break;
//   }
// }
