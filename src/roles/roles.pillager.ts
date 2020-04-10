import { goPillage, goStoreResource } from "./utils";

export function run(creep: Creep) {
  if (creep.store.getFreeCapacity() === 0) {
    goStoreResource(creep, RESOURCE_ENERGY);
  } else {
    goPillage(creep);
  }
}
