import * as Harvester from "./roles.harvester";
import * as Builder from "./roles.builder";

Creep.prototype.run = function() {
  if (this.memory.role === "harvester") {
    Harvester.run(this);
  } else if (this.memory.role === "builder") {
    Builder.run(this);
  } else if (this.memory.role === "upgrader") {
    Upgrader.run(this);
  } else if (this.memory.role === "pillager") {
    Pillager.run(this);
  }
};
