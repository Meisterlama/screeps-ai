import { goBuild, goGetResource } from "./utils";

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
