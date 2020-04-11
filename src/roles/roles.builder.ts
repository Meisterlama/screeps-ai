import { goRepair, goBuild, goGetResource, goHarvest } from "./utils";

export function run(creep: Creep) {
  if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
    creep.memory.building = false;
  }
  if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
    creep.memory.building = true;
  }

  if (creep.memory.building) {
    if (!goRepair(creep)) {
      if (!goBuild(creep)) {
        if (!goGetResource(creep, RESOURCE_ENERGY, 200)) {
          goHarvest(creep, RESOURCE_ENERGY, false);
        }
      }
    }
  }
}
