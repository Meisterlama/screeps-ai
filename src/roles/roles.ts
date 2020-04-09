import * as Harvester from "./roles.harvester";
import * as Builder from "./roles.builder";
import * as Upgrader from "./roles.upgrader";

export function run(creep: Creep) {
  if (creep.memory.role === "harvester") {
    Harvester.run(creep);
  } else if (creep.memory.role === "builder") {
    Builder.run(creep);
  } else if (creep.memory.role === "upgrader") {
    Upgrader.run(creep);
  }
}
