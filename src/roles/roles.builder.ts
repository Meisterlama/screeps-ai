export function run(creep: Creep) {
  if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
    creep.memory.building = false;
  }
  if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
    creep.memory.building = true;
  }

  if (creep.memory.building) {
    goBuild(creep);
  } else {
    goGetResource(creep, RESOURCE_ENERGY, 200);
  }
}

function goBuild(creep: Creep) {
  var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
  if (targets.length) {
    if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0], {
        visualizePathStyle: { stroke: "#ffffff" }
      });
    }
  }
}

function goGetResource(creep: Creep, resource: ResourceConstant, minStock = 0) {
  var targets = creep.room.find(FIND_STRUCTURES, {
    filter: structure => {
      return (
        (structure.structureType == STRUCTURE_EXTENSION ||
          structure.structureType == STRUCTURE_SPAWN) &&
        (structure.store.getUsedCapacity(resource) || 0) > minStock
      );
    }
  });
  if (targets.length > 0) {
    if (creep.withdraw(targets[0], resource) == ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0], {
        visualizePathStyle: { stroke: "#ffffff" }
      });
      return true;
    }
  }
  return false;
}
