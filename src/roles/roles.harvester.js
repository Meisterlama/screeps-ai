export function run(creep: Creep) {
  if (this.goHarvest(creep, RESOURCE_ENERGY)) {
    this.goStoreResource(creep, RESOURCE_ENERGY);
  }
}

function goHarvest(creep: Creep, resource: ResourceConstant): boolean {
  if (this.store.getFreeCapacity(resource) === 0) return false;
  var nodes = this.room.find(FIND_SOURCES);
  if (nodes.length > 0) {
    if (
      this.harvest(nodes[0]) === ERR_NOT_IN_RANGE &&
      this.store.getFreeCapacity() !== 0
    ) {
      this.moveTo(nodes[0], { visualizePathStyle: { stroke: "#ffaa00" } });
    }
  }
  return true;
}

function goStoreResource(creep: Creep, resource: ResourceConstant): boolean {
  var targets = this.room.find(FIND_STRUCTURES, {
    filter: structure => {
      return (
        (structure.structureType == STRUCTURE_EXTENSION ||
          structure.structureType == STRUCTURE_SPAWN) &&
        (structure.store.getFreeCapacity(resource) || 0) > 0
      );
    }
  });
  if (targets.length > 0) {
    if (this.transfer(targets[0], resource) == ERR_NOT_IN_RANGE) {
      this.moveTo(targets[0], {
        visualizePathStyle: { stroke: "#ffffff" }
      });
      return true;
    }
  }
  return false;
}
