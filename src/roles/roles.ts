import * as Harvester from "./roles.harvester";
import * as Builder from "./roles.builder";
import * as Upgrader from "./roles.upgrader";
import * as Pillager from "./roles.pillager";

export function run(creep: Creep) {
  if (creep.memory.role === "harvester") {
    Harvester.run(creep);
  } else if (creep.memory.role === "builder") {
    Builder.run(creep);
  } else if (creep.memory.role === "upgrader") {
    Upgrader.run(creep);
  } else if (creep.memory.role === "pillager") {
    Pillager.run(creep);
  }
}
