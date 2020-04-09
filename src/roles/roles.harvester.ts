import { goHarvest, goStoreResource } from "./utils";

export function run(creep: Creep) {
  if (goHarvest(creep, RESOURCE_ENERGY)) {
    goStoreResource(creep, RESOURCE_ENERGY);
  }
}
