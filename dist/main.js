var roles = require("roles");
var stat = require("stat");
var spawner = require("spawner");

/**
 * Clear creeps unused in memory
 */
function clearCreeps() {
  for (let name in Memory.creeps) {
    if (!Game.creeps[name]) {
      console.log("clearing");
      //Memory.nodes[Memory.creeps[name].node.id] -= 1;
      delete Memory.creeps[name];
    }
  }
}

/**
 * Update population in roomId with spawnerId
 * @param  {string} roomId    [description]
 * @param  {string} spawnerId [description]
 */
function updatePop(roomId, spawnerId) {
  var controllerLevel = Game.rooms[roomId].controller.level;
  if (controllerLevel == 2) {
    if (
      //spawner.trySpawn("pillager", [CARRY, CARRY, MOVE], 2, spawnerId) ||
      spawner.trySpawn("harvester", [WORK, WORK, CARRY, MOVE], 6, spawnerId) ||
      spawner.trySpawn("upgrader", [WORK, CARRY, MOVE], 3, spawnerId) ||
      spawner.trySpawn("builder", [WORK, CARRY, MOVE], 3, spawnerId)
    ) {
      return true;
    }
  }

  if (controllerLevel == 1) {
    if (
      spawner.trySpawn("harvester", [WORK, CARRY, MOVE], 6, spawnerId) ||
      spawner.trySpawn("upgrader", [WORK, CARRY, MOVE], 2, spawnerId)
      //spawner.trySpawn("pillager", [CARRY, CARRY, MOVE], 2, spawnerId)
    ) {
      return true;
    }
  }
}

/**
 * [construct description]
 * @param  {STRUCTURE_*} [description]
 * @param  {string} roomId    [description]
 * @param  {string} spawnerId [description]
 * @return {bool} Did it build
 */
function construct(structure, roomId, spawnerId) {
  var controllerLevel = Game.rooms[roomId].controller.level;
  var spawnerObj = Game.spawns[spawnerId];
  var buildCount = _.filter(
    Game.structures,
    struct => struct.type == structure
  );
  if (buildCount < CONTROLLER_STRUCTURES[structure][controllerLevel]) {
    var ret = PathFinder.search(
      spawnerObj.pos,
      { pos: spawnerObj.pos, range: 5 },
      {
        flee: true,
        roomCallback: function(roomName) {
          let room = Game.rooms[roomName];
          // In this example `room` will always exist, but since
          // PathFinder supports searches which span multiple rooms
          // you should be careful!
          if (!room) return;
          let costs = new PathFinder.CostMatrix();

          room.find(FIND_STRUCTURES).forEach(function(struct) {
            costs.set(struct.pos.x, struct.pos.y, 0xff);
          });
          room.find(FIND_CONSTRUCTION_SITES).forEach(function(struct) {
            costs.set(struct.pos.x, struct.pos.y, 0xff);
          });
          return costs;
        }
      }
    );
    if (ret.incomplete) {
      return false;
    }
    Memory.ret = ret;
    if (
      Game.rooms[roomId].createConstructionSite(ret.path[0], structure) === 0
    ) {
      return true;
    }
  }
  return false;
}

module.exports.loop = function() {
  for (let roomId in Game.rooms) {
    clearCreeps();
    updatePop(roomId, "Spawn1");
  }

  // var tower = Game.getObjectById('040f615dc0a28e986ff243c9');
  // if(tower) {
  //   var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
  //     filter: (structure) => structure.hits < structure.hitsMax
  //   });
  //   if(closestDamagedStructure) {
  //     tower.repair(closestDamagedStructure);
  //   }
  //
  //   var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  //   if(closestHostile) {
  //     tower.attack(closestHostile);
  //   }
  // }

  for (let name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.memory.role == "harvester") {
      roles.roleHarvester.run(creep);
    }
    if (creep.memory.role == "upgrader") {
      roles.roleUpgrader.run(creep);
    }
    if (creep.memory.role == "builder") {
      roles.roleBuilder.run(creep);
    }
    if (creep.memory.role == "pillager") {
      roles.rolePillager.run(creep);
    }
  }
  stat();
};
