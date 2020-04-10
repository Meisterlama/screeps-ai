import { goGetResource, goHarvest, goUpgradeController } from "./utils";

export function run(creep: Creep) {
  if (creep.store.getFreeCapacity() === 0) {
    creep.memory.needResource = false;
  } else if (creep.store.getUsedCapacity() === 0) {
    creep.memory.needResource = true;
  }
  if (creep.memory.needResource) {
    if (!goGetResource(creep, RESOURCE_ENERGY, 200)) {
      goHarvest(creep, RESOURCE_ENERGY, false);
    }
  } else {
    goUpgradeController(creep);
  }
}
