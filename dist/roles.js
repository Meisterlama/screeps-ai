/**
 * [findNode description]
 * @param  {Creep} creep [description]
 * @param  {Array} nodes [description]
 * @return {bool|Source}       [description]
 */
function findNode(creep, nodes, limit) {
  if (nodes.length === 0) return false;
  if (!creep.room.memory.nodes) creep.room.memory.nodes = [];
  var idx = 0;
  while (idx < nodes.length) {
    if (!creep.room.memory.nodes[idx]) {
      if (limit) {
        creep.room.memory.nodes[idx] = 1;
      }
      return nodes[idx];
    } else if (creep.room.memory.nodes[idx] < 3) {
      if (limit) {
        creep.room.memory.nodes[idx] += 1;
      }
      return nodes[idx];
    }
    idx = idx + 1;
  }
  return false;
}

/**
 * [goHarvest description]
 * @param  {Creep} creep    [description]
 * @param  {RESOURCE_*} resource [description]
 * @return {bool}          [description]
 */
function goHarvest(creep, resource, limit = true) {
  if (creep.store.getFreeCapacity(resource) === 0) return false;
  var nodes = creep.room.find(FIND_SOURCES);
  if (!creep.memory.node) creep.memory.node = findNode(creep, nodes, limit);
  else if (
    creep.harvest(Game.getObjectById(creep.memory.node.id)) ==
      ERR_NOT_IN_RANGE &&
    creep.store.getFreeCapacity() !== 0
  ) {
    creep.moveTo(Game.getObjectById(creep.memory.node.id), {
      visualizePathStyle: { stroke: "#ffaa00" }
    });
  }
  return true;
}

/**
 * [goStoreResource description]
 * @param  {Creep} creep    [description]
 * @param  {RESOURCE_*} resource [description]
 * @return {bool}          [description]
 */
function goStoreResource(creep, resource) {
  var targets = creep.room.find(FIND_STRUCTURES, {
    filter: structure => {
      return (
        (structure.structureType == STRUCTURE_EXTENSION ||
          structure.structureType == STRUCTURE_SPAWN) &&
        structure.store.getFreeCapacity(resource) > 0
      );
    }
  });
  if (targets.length > 0) {
    if (creep.transfer(targets[0], resource) == ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0], {
        visualizePathStyle: { stroke: "#ffffff" }
      });
      return true;
    }
  }
  return false;
}

/**
 * [goGetResource description]
 * @param  {Creep} creep        [description]
 * @param  {RESOURCE_*} resource     [description]
 * @param  {Number} [minStock=0] [description]
 * @return {bool}              [description]
 */
function goGetResource(creep, resource, minStock = 0) {
  var targets = creep.room.find(FIND_STRUCTURES, {
    filter: structure => {
      return (
        (structure.structureType == STRUCTURE_EXTENSION ||
          structure.structureType == STRUCTURE_SPAWN) &&
        structure.store.getUsedCapacity(resource) > minStock
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
/**
 * [goPillage description]
 * @param  {Creep} creep [description]
 * @return {bool}       [description]
 */
function goPillage(creep) {
  var targets = creep.room.find(FIND_RUINS, {
    filter: structure => {
      return structure.store.getUsedCapacity() > 0;
    }
  });
  if (targets.length > 0) {
    if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0], {
        visualizePathStyle: { stroke: "#ffffff" }
      });
      return true;
    }
  }
  return false;
}
/**
 * [goUpgradeController description]
 * @param  {Creep} creep [description]
 * @return {bool}       [description]
 */
function goUpgradeController(creep) {
  if (creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) return false;

  if (
    creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE
    //creep.signController(creep.room.controller, "") === ERR_NOT_IN_RANGE
  ) {
    creep.moveTo(creep.room.controller, {
      visualizePathStyle: { stroke: "#ffffff" }
    });
  }
  return true;
}

function goBuild(creep) {
  var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
  if (targets.length) {
    if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0], {
        visualizePathStyle: { stroke: "#ffffff" }
      });
    }
  }
}

var roles = {
  roleBuilder: {
    /** @param {Creep} creep **/
    run: function(creep) {
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
  },

  roleHarvester: {
    /** @param {Creep} creep **/
    run: function(creep) {
      if (!goHarvest(creep, RESOURCE_ENERGY)) {
        goStoreResource(creep, RESOURCE_ENERGY);
        goHarvest(creep, RESOURCE_ENERGY, false);
      }
    }
  },

  roleUpgrader: {
    /** @param {Creep} creep **/
    run: function(creep) {
      if (creep.store.getFreeCapacity() === 0) {
        creep.memory.needResource = false;
      } else if (creep.store.getUsedCapacity() === 0) {
        creep.memory.needResource = true;
      }
      if (creep.memory.needResource) {
        goGetResource(creep, RESOURCE_ENERGY, 200);
        goHarvest(creep, RESOURCE_ENERGY, false);
      } else {
        goUpgradeController(creep);
      }
    }
  },

  rolePillager: {
    /** @param {Creep} creep **/
    run: function(creep) {
      if (
        !goPillage(creep) &&
        creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0
      ) {
        goStoreResource(creep, RESOURCE_ENERGY);
      }
    }
  }
};

module.exports = roles;
