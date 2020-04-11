import { goPillage, goStoreResource } from "./utils";

export function run(creep: Creep) {
  if (!goPillage(creep)) {
    goStoreResource(creep, RESOURCE_ENERGY);
  } else {
    goPillage(creep);
  }
}
