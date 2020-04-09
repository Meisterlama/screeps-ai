function exportStats() {
  // Reset stats object
  Memory.stats = {
    gcl: {},
    rooms: {},
    cpu: {}
  };

  Memory.stats.time = Game.time;

  // Collect room stats
  for (let roomName in Game.rooms) {
    let room = Game.rooms[roomName];
    let isMyRoom = room.controller ? room.controller.my : false;
    if (isMyRoom) {
      let roomStats = (Memory.stats.rooms[roomName] = {});
      roomStats.storageEnergy = room.storage ? room.storage.store.energy : 0;
      roomStats.terminalEnergy = room.terminal ? room.terminal.store.energy : 0;
      roomStats.energyAvailable = room.energyAvailable;
      roomStats.energyCapacityAvailable = room.energyCapacityAvailable;
      roomStats.controllerProgress = room.controller.progress;
      roomStats.controllerProgressPercent =
        room.controller.progress / room.controller.progressTotal;
      roomStats.controllerLevel = room.controller.level;
    }
  }

  // Collect GCL stats
  Memory.stats.gcl.progress = Game.gcl.progress;
  Memory.stats.gcl.progressPercent = Game.gcl.progress / Game.gcl.progressTotal;
  Memory.stats.gcl.level = Game.gcl.level;

  // Collect CPU stats
  Memory.stats.cpu.bucket = Game.cpu.bucket;
  Memory.stats.cpu.limit = Game.cpu.limit;
  Memory.stats.cpu.used = Game.cpu.getUsed();
  Memory.stats.cpu.percents = Memory.stats.cpu.used / Memory.stats.cpu.limit;
}

module.exports = exportStats;
